import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTemplateComponent } from './view-template.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewEleTemplateComponent } from './view-ele-template/view-ele-template.component';



@NgModule({
  declarations: [
    ViewTemplateComponent,
    ViewEleTemplateComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ViewTemplateComponent
  ]
})
export class ViewTemplateModule { }
