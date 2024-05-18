import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import "external-svg-loader";

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {

  @ViewChild("your_svg", {static: true}) svg!: ElementRef

  constructor() {
    this.svg = {} as ElementRef;
  }

  ngOnInit() {
    console.log(this.svg);
  }
}
