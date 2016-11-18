import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent}   from './components/profile.component';
@NgModule({
  imports:      [ BrowserModule,HttpModule ],
  declarations: [ ProfileComponent ],
  bootstrap:    [ ProfileComponent ]
})
export class AppModule { }
