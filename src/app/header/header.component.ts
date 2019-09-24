import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api'; 
import {MenuModule} from 'primeng/menu';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  display;

  items: MenuItem[];

  items2: MenuItem[];
  
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Angular.io', icon: 'fa fa-link', url: 'http://angular.io'},
      {label: 'Theming', icon: 'fa fa-paint-brush', routerLink: ['/theming']}
    ];

    this.items2 = [
      {label: 'Resource'},
      {label: 'Project'},
      {label: 'Change Request'},
      {label: 'Budget'},
      {label: 'Prime Supplier'},
      {label: 'Change Control'},
      {label: 'Contract'},
      {label: 'Approved Change'},
      {label: 'Summary'}
    ]
  }

}
