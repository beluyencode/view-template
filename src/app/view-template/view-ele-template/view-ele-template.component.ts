import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ViewTemplateService } from '../view-template.service';
import { Template, TypeTemplate } from '../view-template';

@Component({
  selector: 'app-view-ele-template',
  templateUrl: './view-ele-template.component.html',
  styleUrls: ['./view-ele-template.component.scss']
})
export class ViewEleTemplateComponent {
  @ViewChild('ele') ele: ElementRef;
  @Input() data: Template;
  @Input() scale: number;
  isSelect = false;
  typeTemplate = TypeTemplate;
  prevSize = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  prevPos = {
    x: 0,
    y: 0
  }

  constructor(
    public viewTemplateService: ViewTemplateService,
  ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

  }

}
