import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const matModules = [
  BrowserAnimationsModule,
  MatButtonToggleModule,
  MatButtonModule
]

@NgModule({
  imports: [
    CommonModule,
    matModules
  ],
  exports: [
    matModules
  ],
  declarations: []
})
export class SharedModule { }
