import { NgModule } from '@angular/core';
import { GameComponent } from './game-component/game.component';
import { RouterModule } from '@angular/router';
import { routes } from './game.routes';
import { SharedModule } from '../shared/shared.module';
import { ImageService } from './services/image.service';
import { WikipediaService } from './services/wikipedia.service';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
	],
	providers: [
		ImageService,
		WikipediaService
	],
  declarations: [GameComponent]
})
export class GameModule { }
