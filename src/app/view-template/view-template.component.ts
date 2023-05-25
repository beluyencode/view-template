import { Component } from '@angular/core';
import { ViewTemplateService } from './view-template.service';

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.scss'],
  providers: [
    ViewTemplateComponent
  ]
})
export class ViewTemplateComponent {

  constructor(
    public viewTemplateService: ViewTemplateService
  ) { }

}
