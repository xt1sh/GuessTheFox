import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';

const matModules = [
  MatButtonToggleModule,
	MatButtonModule,
	MatProgressSpinnerModule
]

@NgModule({
  imports: [
		CommonModule,
    matModules
  ],
  exports: [
		CommonModule,
		LoaderComponent,
    matModules
  ],
  declarations: [LoaderComponent]
})
export class SharedModule { }
