import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapComponent } from '../../components/map/map'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public isPickupRequested: boolean;
  constructor(public navCtrl: NavController) {
    this.isPickupRequested = false;
  }

  confirmPickup() {
    this.isPickupRequested = true;
  }
  cancelPickup() {
    this.isPickupRequested = false;
  }
}
