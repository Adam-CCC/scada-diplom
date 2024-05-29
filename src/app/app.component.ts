import { Component, OnInit, Injectable } from '@angular/core';
import { WebSocketService } from './services/web-socket.service'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  feeder1Color = 'gray';
  data: any;
  light = 2;

  constructor(private webSocketService: WebSocketService, private http: HttpClient) {}

  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe((message) => {
      console.log('Received message from server:', message);
    });

    this.webSocketService.getData().subscribe((response) => {
      this.webSocketService.getData().subscribe((response) => {
        this.data = response;
        console.log('Data from JSON:', this.data); // Выводим данные в консоль

        // Применяем стили к элементам на основе JSON данных
        this.applyStyles();
      });
    });
  }

  applyStyles() {
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
              if (obj == variableValue) {
                style = item[k][obj].style;
              }
            }
          }
          if (style !== null || undefined) {
            for (const key in style) {
              element.setAttribute(key, style[key]);
            }
          }
        }
      }
    });
  }
  
  
}