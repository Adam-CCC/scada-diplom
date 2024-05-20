import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  feeder1Color = 'gray';

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe((message) => {
      console.log('Received message from server:', message);
    });
  }
}