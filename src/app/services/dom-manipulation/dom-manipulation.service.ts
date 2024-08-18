import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomManipulation {

  constructor() { }

  public getChildsElement(element: any, attr: any, value: any) {
    let children = element.children

    // Перебираем всех детей и выводим их в консоль
    for (var i = 0; i < children.length; i++) {
      children[i].setAttribute(attr, value);
    }
  }

  public setStyle(style: any, element: any) {
    if (style !== null || undefined) {
      for (const key in style) {
        element.setAttribute(key, style[key]);
      }
    }
  }
}
