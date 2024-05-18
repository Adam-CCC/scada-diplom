import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import "external-svg-loader";

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const componentElement = this.elementRef.nativeElement;
    console.log(componentElement.querySelector("#tp11")); // Вывод DOM-элемента компонента в консоль
  }
}