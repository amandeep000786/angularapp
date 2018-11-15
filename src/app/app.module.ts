import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatToolbarModule, MatButtonModule, MatInputModule,
  MatNativeDateModule ,MatSelectModule,MatCheckboxModule,MatDatepickerModule,MatProgressSpinnerModule,MatProgressBarModule, MatTooltipModule, MatTableModule, MatIconModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { showEditDeleteComponent } from './showEditDelete/showEditDelete.component';
import { insertEntryComponent } from './insertEntry/insertEntry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from './common.service';
import { headerComponent } from './header/header.component';
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
  declarations: [
    AppComponent,showEditDeleteComponent,insertEntryComponent,headerComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatNativeDateModule,
    HttpModule,
    MatCheckboxModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    NgxPaginationModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
