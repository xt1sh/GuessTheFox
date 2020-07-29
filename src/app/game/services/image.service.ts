import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import * as wiki from '@drumtj/wiki';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class ImageService {

  constructor() { }

  getImageSrc(name: string): Observable<string> {
    return from(wiki.images(name)).pipe(
			map((res: any) => res.pages[0].imageinfo[0].url),
		);
  }

}
