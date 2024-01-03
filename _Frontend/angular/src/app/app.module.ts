import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FejlecComponent } from './fejlec/fejlec.component';
import { CimsorComponent } from './cimsor/cimsor.component';
import { MenuComponent } from './menu/menu.component';
import { FooldalComponent } from './fooldal/fooldal.component';
import { AsztalFoglalasComponent } from './asztal-foglalas/asztal-foglalas.component';
import { LoginAblakComponent } from './login-ablak/login-ablak.component';
import { ElerhetosegekComponent } from './elerhetosegek/elerhetosegek.component';
import { LablecComponent } from './lablec/lablec.component';

@NgModule({
  declarations: [
    AppComponent,
    FejlecComponent,
    CimsorComponent,
    MenuComponent,
    FooldalComponent,
    AsztalFoglalasComponent,
    LoginAblakComponent,
    ElerhetosegekComponent,
    LablecComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
