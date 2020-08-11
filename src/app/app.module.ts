import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { GameModule } from './game/game.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    pan: { direction: Hammer.DIRECTION_ALL },
    swipe: { direction: Hammer.DIRECTION_VERTICAL },
}}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		SharedModule,
    GameModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
