import { Injectable } from '@angular/core';
import { WebSocketService } from '../../web-socket/web-socket.service';
import { TimeService } from '../time/time.service';

@Injectable({
  providedIn: 'root'
})
export class DomManipulation {

  data: any;
  resetArrows: any;

  formatedDateTime: string = "";
  feeder1Color = 'gray';
  intervalId: any;
  numberResetArrows = 0;
  stateLog = "";
  secondLineCurrent = 0;
  firstLineCurrent = 1.3;
  light = 3;

  constructor(
    private webSocketService: WebSocketService,
    private time: TimeService
  ) { 
    this.formatedDateTime = this.time.formatedDateTime;
    this.initWebSocket();

    setInterval(() => {
      this.updateVariable();
    }, 1000);
  } 

  private initWebSocket () {
    this.webSocketService.getMessages().subscribe((message) => {
      console.log('Received message from server:', message);
    });

    this.webSocketService.getData().subscribe((response) => {
        this.data = response;
        console.log('Data from JSON:', this.data); // Выводим данные в консоль

        // Применяем стили к элементам на основе JSON данных
        this.applyStyles();
        this.setClicks();
    });
  }

  public updateVariable() {
    this.time.updateDateTime();
    this.applyStyles();
  }

  public getChildsElement(element: any, attr: any, value: any) {
    let children = element.children

    // Перебираем всех детей и выводим их в консоль
    for (var i = 0; i < children.length; i++) {
      children[i].setAttribute(attr, value);
    }
  }

  private setClicks() {
    this.resetArrows = document.getElementById("reset_button");
    this.resetArrows?.addEventListener("click", () => {
      let arrow1 = document.getElementById("arrow_1");
      this.getChildsElement(arrow1, "stroke", "#FD3232");

      let arrow2 = document.getElementById("arrow_2");
      this.getChildsElement(arrow2, "stroke", "#FD3232");

      let path2_2 = document.getElementById("path_2_2");
      this.getChildsElement(path2_2, "stroke", "#9FFF72");
      
      let path3_2 = document.getElementById("path_3_2");
      this.getChildsElement(path3_2, "stroke", "#9FFF72");

      let path1_2 = document.getElementById("path_1_2");
      this.getChildsElement(path1_2, "stroke", "#9FFF72");
      
      let path1_3 = document.getElementById("path_1_2");
      this.getChildsElement(path1_3, "stroke", "#9FFF72");
    })
  } 

  public setStyle(style: any, element: any) {
    if (style !== null || undefined) {
      for (const key in style) {
        element.setAttribute(key, style[key]);
      }
    }
  }

  public applyStyles() {
    let element: any;
    let variable: any;
    let variableValue: any;
    let style: any;

    this.data.forEach((item: any) => {
      for (const k in item) {
        if (item.hasOwnProperty(k)) {
          if(k == "elementId") {
            element = document.getElementById(item[k])
          }
          if(k == "variable") {
            variable = item[k];
            variableValue = this[variable as keyof this]
          }
          if(k == "value") {
            for (const obj in item[k]) {
              if (obj == variableValue) { // Задаем стили, в зависимости
                style = item[k][obj].style;
                this.setStyle(style, element)
              } else if (obj !== variableValue && item[k].default) { // Если надо отобразить текст
                if (typeof item[k][obj].style === "string") {
                  style = item[k][obj].style;
                  element = element.querySelector('tspan');
                  if (variable == style) {
                    element.innerHTML = variableValue;                      
                  }
                  element.style.cssText = `
                    text-align: center;
                    text-anchor: middle
                  `;
                  return  
                } 
              }
            }
          }
        }
      }
    });
  }
}
