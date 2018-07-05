import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule, ApplicationRef } from '@angular/core';
import { MatDialog,
         MatDialogRef,
         MatSnackBar,
         MatMenuModule,
         MatButtonModule,
         MatSidenavModule,
         MatSelectModule,
         MatInputModule,
         MatIconModule,
         MatSlideToggleModule,
         MatDividerModule,
         MatProgressBarModule } from '@angular/material';
// import {
//         AmazingTimePickerModule
//        } from '../fixedModule/amazing-time-picker/amazing-time-picker.es5';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppComponent } from './app.component';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDividerModule,
    AmazingTimePickerModule,
    ColorPickerModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
