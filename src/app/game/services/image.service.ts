import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

  constructor() { }

  async getImageSrc(name: string): Promise<string> {
    return 'https://icdn.lenta.ru/images/2016/10/19/21/20161019212444332/detail_f6c6be29b37a404acdf29da02a0eaecf.jpg';
  }

}
