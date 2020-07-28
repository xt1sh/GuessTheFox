import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game-component/game.component';
import { RouterModule } from '@angular/router';
import { routes } from './game.routes';
import { GameRoutingModule } from './game-routing.module';
import { WikipediaService } from './services/wikipedia.service';
import { ImageService } from './services/image.service';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [GameComponent],
  providers: [WikipediaService, ImageService]
})
export class GameModule { }
