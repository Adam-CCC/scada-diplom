import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  formatedDateTime: string = "";

  constructor() { 
    this.updateDateTime();
  }
  
  public updateDateTime() {
    const now = new Date();

    const day = this.padZero(now.getDate());
    const month = this.padZero(now.getMonth() + 1);
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());

    this.formatedDateTime = `${day}/${month}/${hours}:${minutes}`;
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
