import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeOrders: string;
  typeOfContent: string;

  ngOnInit(): void {
    this.activeOrders = '';
    this.typeOfContent = 'Orders';
  }

  changeActiveOrders(typeOrders: string): void {
    this.activeOrders = typeOrders;
    this.changeView('Orders');
  }

  changeView(typeOfContent: string): void {
    this.typeOfContent = typeOfContent;
  }
}
