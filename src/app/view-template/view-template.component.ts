import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ViewTemplateService } from './view-template.service';
import { Template, TemplateGroup, TypeScreen } from './view-template';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { retry } from 'rxjs';

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.scss'],
  providers: [
    ViewTemplateService
  ]
})
export class ViewTemplateComponent implements OnInit, AfterViewInit {
  @Input() edit: boolean = true;
  @ViewChild('eleView') ele: ElementRef;
  @ViewChild('eleViewParent') eleParent: ElementRef;
  @ViewChild('checkin') inputCheckIn: ElementRef;
  listTemplate: any[];
  typeScreen = TypeScreen;
  scale: number;
  loading = false;
  idTemplate = '';
  formCheckIn: FormGroup;
  prevCode = '';
  prevTime = new Date();

  constructor(
    public viewTemplateService: ViewTemplateService,
    private renderer2: Renderer2,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.formCheckIn = this.fb.group({
      qr: ''
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeScale();
      (this.inputCheckIn.nativeElement as HTMLInputElement).focus();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.changeScale();
  }

  @HostListener('window:click', ['$event'])
  click(event: any) {
    if (this.inputCheckIn.nativeElement) {
      (this.inputCheckIn.nativeElement as HTMLInputElement).focus();
    }
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    console.log(event);

    if (event.data.event_id && event.data.device_id) {
      this.viewTemplateService.event_id = event.data.event_id;
      this.viewTemplateService.device = event.data.device_id;
      this.viewTemplateService.id_event_device.next(true);
    } else {
      // this.viewTemplateService.id_event_device.next(true);
    }
  }

  ngOnInit(): void {
    this.viewTemplateService.listen_event_device().subscribe((res: any) => {
      if (res) {
        this.viewTemplateService.getEvent().subscribe((event: any) => {
          if (event) {
            this.viewTemplateService.event = event.data;
            this.viewTemplateService.listValueDynamic = [
              {
                value: '{{name}}',
                label: 'Tên'
              }, {
                value: '{{phone}}',
                label: 'Số điện thoại'
              }, {
                value: '{{address}}',
                label: 'Địa chỉ'
              }, {
                value: '{{rank["name"]}}',
                label: 'Hạng khách hàng'
              },
              {
                value: '{{time_checkin}}',
                label: 'Thời gian check in'
              },
              ...this.viewTemplateService.event.params_name.map((ele: string) => {
                return {
                  value: `{{params["${ele}"]}}`,
                  label: ele
                }
              })
            ];
            this.viewTemplateService.listQrValueDynamic = [{
              value: 'https://api.dev.qrclc.com/api/guest/qrcode/{{_id}}',
              label: 'QR code'
            }];

            if (event?.data?.config?.background) {
              this.viewTemplateService.background = event?.data?.config?.background;
            }
            if (event?.data?.config?.listElement) {
              const newTemplateGroup = new TemplateGroup('');
              const newTemplate = new Template('', 0);
              this.viewTemplateService.listElement = event.data.config.listElement.map((ele: any) => {
                if (ele.data) {
                  return newTemplateGroup.clone().convertType({
                    ...ele,
                    data: ele.data.map((ele2: any) => {
                      return newTemplate.clone().convertType(ele2);
                    })
                  });
                } else {
                  return newTemplate.clone().convertType(ele);
                }
              });
              this.viewTemplateService.changeStateCheckIn('hidden', null);
              // setTimeout(() => {
              //   this.changeScale();
              // });
              this.viewTemplateService.load_list_element.next(this.viewTemplateService.listElement);
              this.viewTemplateService.connect().pipe(retry({ delay: 1000 })).subscribe((res4: any) => {
                if (res4.data?.is_checkin) {
                  this.viewTemplateService.changeStateCheckIn('info', res4.data);
                } else {
                  this.viewTemplateService.changeStateCheckIn(res4.status, res4?.data);
                }
              });
            }
          }
        })
      }
    });
    this.viewTemplateService.listen_change_scale_screen().subscribe((res: any) => {
      if (res) {
        setTimeout(() => {
          this.changeScale();
        });
      }
    });
    this.viewTemplateService.listen_change_list_element().subscribe((res: Template[]) => {
      if (res) {
        this.listTemplate = res;
      }
    });
  }


  changeScale() {
    if (this.viewTemplateService.background.scale === this.typeScreen.MOBILE) {
      this.viewTemplateService.scaleDefault = 353;
    } else {
      this.viewTemplateService.scaleDefault = 854;
    }
    this.scale = (this.ele.nativeElement as HTMLDivElement).clientWidth / this.viewTemplateService.scaleDefault;
    this.viewTemplateService.currentWidth = (this.ele.nativeElement as HTMLDivElement).clientWidth;
    this.viewTemplateService.currentHeight = (this.ele.nativeElement as HTMLDivElement).clientHeight;
  }

  isGroup(ele: Template | TemplateGroup) {
    if (ele instanceof Template) {
      return false;
    }
    return true;
  }

  submit() {
    const arrCode = (this.formCheckIn.getRawValue().qr.split('/'));
    this.prevCode = this.formCheckIn.getRawValue().qr;
    const countTime = new Date().getTime() - this.prevTime.getTime();
    if (this.prevCode !== (arrCode[arrCode.length - 1] ?? '')) {
      this.viewTemplateService.checkin(arrCode[arrCode.length - 1] ?? '').subscribe({
        next: () => {
          this.prevCode = arrCode[arrCode.length - 1] ?? '';
          this.prevTime = new Date();
        },
        error: (err: any) => {
          console.log('123', err);
          this.prevTime = new Date();
        },
      });
    } else {
      if (countTime > 3000) {
        this.viewTemplateService.checkin(arrCode[arrCode.length - 1] ?? '').subscribe({
          next: () => {
            this.prevCode = arrCode[arrCode.length - 1] ?? '';
            this.prevTime = new Date();
          },
          error: (err: any) => {
            console.log('123', err);
            this.prevTime = new Date();
          },
        });
      } else {
        this.toastr.warning('Vui lòng quét chậm lại!')
      }
    }
    this.formCheckIn.patchValue({
      qr: ''
    });
  }

}
