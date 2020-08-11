import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {

	isLoading: Observable<boolean>;

  constructor(private loader: LoaderService) { }

  ngOnInit() {
		this.isLoading = this.loader.isLoading.asObservable();
  }

}
