import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;
  state: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  toggler() {
    this.state = !this.state;
    if (this.state) {
      this.accordion.closeAll();
    }
  }

}
