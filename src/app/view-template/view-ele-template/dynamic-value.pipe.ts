import { Pipe, PipeTransform } from '@angular/core';
import { ViewTemplateService } from '../view-template.service';
import { TemplateCheckIn } from '../view-template';

@Pipe({
  name: 'dynamicValue'
})
export class DynamicValuePipe implements PipeTransform {

  constructor(private viewTemplateService: ViewTemplateService) {

  }

  getAttr(attr: Array<string>, obj: any) {
    let value = obj;
    attr.forEach((ele: string) => {
      value = this.getValueAttr(ele, value);
    })
    return value;
  }

  getValueAttr(name: string, obj: any) {
    return obj?.[name] ? obj[name] : null;
  }


  transform(value: TemplateCheckIn['notFound'] | TemplateCheckIn["checkedIn"] | TemplateCheckIn["checkIn"] | TemplateCheckIn['hidden'],
    ...args: unknown[]): unknown {
    console.log(this.viewTemplateService.listValueDynamic);
    const findAttr = this.viewTemplateService.listValueDynamic.find((ele: any) => {
      return ele.value === value.content
    })
    if (findAttr) {
      console.log(findAttr);

      console.log(this.viewTemplateService.infoCheckIn);

      console.log((findAttr.value as string).replace('{{', '').replace('}}', '').replace('\"]', '').split('["'));

      const valueAttr = this.getAttr((findAttr.value as string).replace('{{', '').replace('}}', '').replace('\"]', '').split('["'),
        this.viewTemplateService.infoCheckIn);
      if (valueAttr) {
        return valueAttr;
      }
      return '';
    }
    return value.content;
  }

}
