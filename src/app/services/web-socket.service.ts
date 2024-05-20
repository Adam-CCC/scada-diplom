import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | undefined;
  private subject: Subject<any> = new Subject();

  constructor() {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket('ws://localhost:3000');

    this.socket.onmessage = (event) => {
      this.subject.next(JSON.parse(event.data));
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.warn('WebSocket connection closed. Reconnecting...');
      setTimeout(() => this.connect(), 5000);
    };
  }

  public getMessages(): Observable<any> {
    return this.subject.asObservable();
  }
}
