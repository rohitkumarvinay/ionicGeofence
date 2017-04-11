import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Geofence } from 'ionic-native';
import { Platform } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  radius:number = 100;
  submitted: boolean = false;
  public formData = {
    radius: ""
  };

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let GooleMap = new google.maps.Map(document.getElementById('mapfence'), {
        center: latLng,
        zoom: 15
      });
      let marker = new google.maps.Marker({
        position: latLng,
        map: GooleMap,
        title: 'My Location',
      });
    });
  }

  onSubmit(form) {
    this.submitted = true;
    if (form && form.valid) {
      // necessary action
    }
  }

  constructor(private platform: Platform, public navCtrl: NavController) {
    this.platform.ready().then(() => {
      // initialize the plugin
      Geofence.initialize().then(
        // resolved promise does not return a value
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      )
    })
  }

}
