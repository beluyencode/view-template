import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Template, TemplateGroup } from '../view-template';

@Component({
  selector: 'app-view-template-group',
  templateUrl: './view-template-group.component.html',
  styleUrls: ['./view-template-group.component.scss']
})
export class ViewTemplateGroupComponent {
  @ViewChild('ele') ele: ElementRef;
  @Input() data: TemplateGroup;
  @Input() scale: number;

  constructor() { }
}
