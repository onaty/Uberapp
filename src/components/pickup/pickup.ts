import { Component, Input } from '@angular/core';

/**
 * Generated class for the PickupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupComponent {
  @Input() isPinSet: boolean;
  @Input() map: google.maps.Map;

  private popup: google.maps.InfoWindow;
  private pickupMarker: google.maps.Marker;
  constructor() {
    console.log(this.map,77)
    console.log('huytr')
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.isPinSet) {
      this.showPickupMarker();
    } else {
      this.removePickupMarker();
    }


  }

  showPickupMarker() {
    alert(this.map.getCenter())
    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position:  new google.maps.LatLng(334,23)  ,
      icon: '../../assets/imgs/person.png'
    })

    setTimeout(() => {
      this.pickupMarker.setAnimation(null)
    }, 750);

    this.showPickupTime();
  }

  removePickupMarker() {
    if (this.pickupMarker) {
      this.pickupMarker.setMap(null)
    }
  }


  showPickupTime() {
    this.popup = new google.maps.InfoWindow({
      content: '<h5> You are here :) </h5>'
    })

    this.popup.open(this.map, this.pickupMarker);

    google.maps.event.addListener(this.pickupMarker, 'click', () => {
      this.popup.open(this.map, this.pickupMarker)
    })
  }

}
