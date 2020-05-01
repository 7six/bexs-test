import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@app/shared/shared.module';

import { Environment } from '@app/../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import ptBR from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBR);





import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    CurrencyPipe,
    Environment,
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT'
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
