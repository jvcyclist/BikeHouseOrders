import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeOrders: string;
  typeOfContent: string;
  viewDate = new Date();
  events = [];

  constructor() {
    this.activeOrders = '';
    this.typeOfContent = 'Orders';
  }

  ngOnInit(): void {}

  changeActiveOrders(typeOrders: string): void {
    this.activeOrders = typeOrders;
    this.changeView('Orders');
  }

  changeView(typeOfContent: string): void {
    this.typeOfContent = typeOfContent;
  }
}
