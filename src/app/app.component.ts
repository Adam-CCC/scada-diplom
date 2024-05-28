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

  constructor(private webSocketService: WebSocketService, private http: HttpClient) {}

  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe((message) => {
      console.log('Received message from server:', message);
    });

    this.webSocketService.getData().subscribe((response) => {
      this.data = response;
      console.log(this.data); // Выводим данные в консоль
    });
  }
}