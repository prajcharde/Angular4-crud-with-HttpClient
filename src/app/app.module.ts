import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { DataserviceService } from "./service/dataservice.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DataInterceptor } from "./service/dataservice-interceptors";

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule,ModalModule.forRoot(),
  ],
  //different in HTTPclient from http
  providers: [BsModalService,DataserviceService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: DataInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
