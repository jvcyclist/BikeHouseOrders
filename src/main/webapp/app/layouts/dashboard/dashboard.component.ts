import { Component, OnInit } from '@angular/core';
import { Order } from 'app/layouts/dashboard/order';
import { ORDERS } from 'app/layouts/dashboard/mock-data';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Orders: Order[] = ORDERS;
  activeOrders: string;

  constructor() {
    this.activeOrders = '';
  }

  ngOnInit(): void {}

  changeActiveOrders(typeOrders: string): void {
    this.activeOrders = typeOrders;
  }
}
