import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { ViewTemplateService } from '../view-template.service';
import { TemplateCheckIn } from '../view-template';

@Pipe({
    name: 'dynamicValueImg',
    pure: false
})
export class DynamicValueImgPipe implements PipeTransform {
    arr = [
        "{{event_id}}",
        "{{num_order}}",
        "{{_id}}"
    ]
    constructor(private viewTemplateService: ViewTemplateService, private cd: ChangeDetectorRef
    ) { }

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

    //https://api.dev.qrclc.com/api/static/get?f={{event_id}}/{{num_order}}.{{event_id}}.jpg
    transform(value: TemplateCheckIn['notFound'] | TemplateCheckIn["checkedIn"] | TemplateCheckIn["checkIn"] | TemplateCheckIn['hidden'],
        ...args: unknown[]): unknown {
        const findAttr = this.viewTemplateService.listQrValueDynamic.find((ele: any) => {
            return ele.value === value.url
        })
        if (findAttr) {
            let newUrl = findAttr.value;
            this.arr.forEach((ele) => {
                newUrl = newUrl.replaceAll(ele, this.getAttr([ele.replace("{{", "").replace("}}", "")], this.viewTemplateService.infoCheckIn))
            })
            console.log(newUrl);
            return newUrl
        }
        return '';
    }

}
