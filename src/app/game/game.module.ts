import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game-component/game.component';
import { RouterModule } from '@angular/router';
import { routes } from './game.routes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [GameComponent]
})
export class GameModule { }
