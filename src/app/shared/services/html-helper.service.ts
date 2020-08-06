import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlHelperService {

  constructor() { }

  extractContent(content: Node): string {
    var span = document.createElement('span');
    span.innerHTML = content.textContent;
    var children = span.querySelectorAll('*');
    for (var i = 0 ; i < children.length ; i++) {
      if (children[i].textContent) {
        children[i].textContent += ' ';
      } else {
        (children[i] as HTMLElement).innerText += ' ';
      }
    }
    return (span.textContent || span.innerText).toString().replace(/ +/g,' ');
  };

  removeNumberTags(str: string): string {
    return str ? str.replace(/\[([0-9]|[1-9][0-9]|[1-9][0-9][0-9])\]/g, '') : '';
  }

  getSectionName(str: string): string {
    if (str) {
      return str.split('\n')[0] || '';
    }
    return '';
  }
}
