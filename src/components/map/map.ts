import { Component, Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/observable';
import { LoadingController } from 'ionic-angular';

import { PickupComponent } from '../pickup/pickup';
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {
  @Input() isPickupRequested: boolean;
  text: string;
  mapcenter;
  public map: google.maps.Map;
  public isMapidle: boolean;
  constructor(private geolocation: Geolocation,
    public loadingCtrl: LoadingController
  ) {

    console.log('Hello MapComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.map = this.createmap();
    this.getcurrentlocation().subscribe((location) => {
      // this.map.panTo(location)
      this.centerLocation(location)
    })
  }

  getcurrentlocation() {
    let loader = this.loadingCtrl.create(
      {
        content: "locating..."
      }
    );
    loader.present();
    let options = {
      timeout: 1000,
      enableHighAccuracy: true
    }
    let locationobs = Observable.create(observable => {
      this.geolocation.getCurrentPosition(options).then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude

        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
        let location = new google.maps.LatLng(lat, lng)
        console.log(resp)
        observable.next(location)
        loader.dismiss();
      }).catch((error) => {
        console.log('Error getting location', error);
        loader.dismiss();
      });
    })

    return locationobs;
  }

  createmap(location = new google.maps.LatLng(40.7172, -74.0059)) {
    let mapoptions = {
      center: location,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapoptions)

    return map;
  }

  centerLocation(location) {
    // console.log(this.map.getCenter().toJSON() ,23)
    // console.log(this.map.getCenter().lat() ,23)

    if (location) {
      this.map.panTo(location)
    }
    else {
      this.getcurrentlocation().subscribe((currentlocation) => {
        // this.map.panTo(location)
        this.centerLocation(currentlocation)
      })
    }
  }

  addMapEventListeners() {
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapidle = false;
      
    })

    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapidle = true;
    })
  }
}
