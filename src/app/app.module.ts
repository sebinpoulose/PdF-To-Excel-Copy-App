import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DownloadDialogComponentComponent } from './download-dialog-component/download-dialog-component.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    DownloadDialogComponentComponent
  ],
  imports: [
    BrowserModule,PdfViewerModule,MatMenuModule,MatIconModule,MatSlideToggleModule,
    AppRoutingModule,MatButtonModule,MatDividerModule,MatCardModule,MatDialogModule,
    BrowserAnimationsModule,FormsModule,MatFormFieldModule,MatInputModule,AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
