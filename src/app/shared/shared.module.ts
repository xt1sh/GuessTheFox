import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const matModules = [
  MatButtonToggleModule,
  MatButtonModule
]

@NgModule({
  imports: [
    CommonModule,
    matModules
  ],
  exports: [
		CommonModule,
    matModules
  ],
  declarations: []
})
export class SharedModule { }
