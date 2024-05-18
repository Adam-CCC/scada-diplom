import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { SchemaComponent } from './schema/schema.component'
import { HttpClientModule } from '@angular/common/http';
import { Station1Component } from './schema/station1/station1.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SchemaComponent,
    Station1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
