import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  display;

  items: MenuItem[];
  
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Angular.io', icon: 'fa fa-link', url: 'http://angular.io'},
      {label: 'Theming', icon: 'fa fa-paint-brush', routerLink: ['/theming']}
    ];
  }

}
