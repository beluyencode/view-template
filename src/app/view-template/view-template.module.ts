import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTemplateComponent } from './view-template.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewEleTemplateComponent } from './view-ele-template/view-ele-template.component';
import { ToastrModule } from 'ngx-toastr';
import { ViewTemplateGroupComponent } from './view-template-group/view-template-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicValuePipe } from './view-ele-template/dynamic-value.pipe';



@NgModule({
  declarations: [
    ViewTemplateComponent,
    ViewEleTemplateComponent,
    ViewTemplateGroupComponent,
    DynamicValuePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    ViewTemplateComponent
  ]
})
export class ViewTemplateModule { }
