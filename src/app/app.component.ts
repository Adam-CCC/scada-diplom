import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomManipulation } from './services/dom-manipulation/dom-manipulation.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private domManipulation: DomManipulation, private http: HttpClient) {
  }

  ngOnInit(): void {
   
  }

}