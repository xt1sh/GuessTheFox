import { Routes } from '@angular/router';
import { GameModule } from './game/game.module';

export const routes: Routes = [
	{
		path: 'game',
		loadChildren: () => GameModule
	}
]