import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackgroundTemplate, Template, TypeAction, apiUrl } from './view-template';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ViewTemplateService {
  //data
  background: BackgroundTemplate = new BackgroundTemplate();
  listElement: Template[] = [];
  scaleDefault = 854;
  currentWidth = 0;
  currentHeight = 0;
  //event
  load_list_element;
  mouse_over_view;
  changeScaleScreen;


  constructor(
    private http: HttpClient
  ) {
    this.mouse_over_view = new BehaviorSubject<any>(false);
    this.changeScaleScreen = new BehaviorSubject<any>(null);
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


}
