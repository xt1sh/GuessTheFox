import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game-component/game.component';
import { RouterModule } from '@angular/router';
import { routes } from './game.routes';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [GameComponent]
})
export class GameModule { }
