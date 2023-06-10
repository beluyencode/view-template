import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { BackgroundTemplate, Template, TemplateGroup, TypeAction, apiUrl, checkInState } from './view-template';
import { HttpClient } from '@angular/common/http';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { interval } from 'rxjs';
@Injectable()
export class ViewTemplateService {
  //data
  background: BackgroundTemplate = new BackgroundTemplate();
  listElement: Template[] = [];
  scaleDefault = 854;
  currentWidth = 0;
  currentHeight = 0;
  listValueDynamic: any = [];
  listQrValueDynamic: any = [];
  listOs: Subscription[] = [];
  event: any;
  infoCheckIn: any = null;
  //event
  load_list_element;
  mouse_over_view;
  changeScaleScreen;
  id_event_device;
  subject: WebSocketSubject<any>;
  event_id = 'evt_chk8ae223aks7397umqg';
  device = '546869e1babf742062e1bb8b20316576745f63686b386165323233616b7337333937756d7167d41d8cd98f00b204e9800998ecf8427e';

  constructor(
    private http: HttpClient
  ) {
    this.mouse_over_view = new BehaviorSubject<any>(false);
    this.changeScaleScreen = new BehaviorSubject<any>(null);
    this.id_event_device = new BehaviorSubject<any>(null);
    // this.listElement = [...Array(5)].map((ele: any, index: number) => {
    //   return new Template('element' + index);
    // });
    this.load_list_element = new BehaviorSubject<any>(this.listElement);
  }

  listen_change_list_element() {
    return this.load_list_element.asObservable();
  }

  listen_change_scale_screen() {
    return this.changeScaleScreen.asObservable();
  }

  listen_event_device() {
    return this.id_event_device.asObservable();
  }

  getDataConfig() {
    return this.http.get(apiUrl.origin + apiUrl.get, {
      params: {
        id: 'tpl_chn3nuq23aks73c31q0g'
      }
    })
  }

  getEvent() {
    return this.http.get(apiUrl.origin + apiUrl.getEvent, {
      params: {
        id: this.event_id
      }
    })
  }

  connect() {
    this.subject = webSocket({
      url: `${apiUrl.socket}?event_id=${this.event_id}&device=${this.device}`,
      deserializer: (msgEvent) => {
        return JSON.parse(msgEvent.data);
      },
      serializer: (payload: any) => {
        return payload.pattern + ' ' + JSON.stringify(payload.data);
      },
    });
    return this.subject;
  }

  checkin(code: string) {
    return this.http.get(apiUrl.origin + apiUrl.checkIn, {
      params: {
        code: code,
        event_id: this.event_id,
        device: this.device
      }
    })
  }

  changeStateCheckIn(state: string, data: any) {
    let stateCheckIn: checkInState;
    this.infoCheckIn = data;
    switch (state) {
      case 'error':
        stateCheckIn = checkInState.ERROR
        break;
      case 'info':
        stateCheckIn = checkInState.CHECKED;
        break;
      case 'success':
        stateCheckIn = checkInState.CHECKIN;
        break;
      case 'hidden':
        stateCheckIn = checkInState.HIDDEN;
        break;
      default:
        stateCheckIn = checkInState.HIDDEN;
        break;
    }
    this.listElement.forEach(element => {
      if (element instanceof Template) {
        element.checkInOptions.activeType = stateCheckIn
      } else {
        (element as TemplateGroup).data.forEach((item) => {
          item.checkInOptions.activeType = stateCheckIn
        })
      }
    });
    if (stateCheckIn !== checkInState.HIDDEN) {
      this.listOs.forEach(e => e.unsubscribe());
      this.listOs = [];
      const time = new Date();
      this.listOs.push(interval(10000).subscribe(() => {
        console.log(new Date().getTime() - time.getTime());
        this.changeStateCheckIn('hidden', null);
      }))
    } else {
      this.listOs.forEach(e => e.unsubscribe());
      this.listOs = [];
    }
  }

}
