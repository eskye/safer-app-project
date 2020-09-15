import { Component, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalController, Platform } from '@ionic/angular';
import { LocationService } from '@app/shared/services/location.service';
import { NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Marker } from '@app/shared/core/model/Marker';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements AfterViewInit{


  // @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
    address: string;
   height = 0;
   latitude = 0;
   longitude = 0;
   zoom: number = 20;
   markers: Marker[] = [];
  constructor(
      @Inject(DOCUMENT) private doc: Document,
      public platform: Platform,
      public modalCtrl: ModalController,
      private geolocation: Geolocation,
      private nativeGeocoder: NativeGeocoder,
      private locationService: LocationService,
      private activatedRoute: ActivatedRoute
  ) {
   // this.initializeApp();
      this.height = platform.height() - 50;
  }

 async getCurrentLocation(){
     await this.geolocation.getCurrentPosition().then(async res => {
         this.latitude = res.coords.latitude;
         this.longitude = res.coords.longitude;
         this.getAddress(res.coords.latitude, res.coords.longitude);
        this.activatedRoute.queryParams.subscribe(res => {
          this.addMarker(res.latitude, res.longitude, res.address);
      });
     }).catch(err => {
       console.error(err);
     });
  }
  getAddress(lat, long) {
    this.nativeGeocoder.reverseGeocode(lat, long, this.locationService.nativeGeocoderOptions)
        .then(async (res: NativeGeocoderResult[]) => {
          this.address = this.locationService.pretifyAddress(res[0]);
        });
  }
  addMarker(latitude, longitude, address){
   this.markers.push({
       latitude,
       longitude,
       address
   });
  }
  // async mapHandler(latitude: number, longitude: number, info: string = ''){
  //   const appEl = this.doc.querySelector('ion-app');
  //   let isDark = false;
  //   let style = [];
  //   if (appEl.classList.contains('dark-theme')) {
  //     style = darkStyle;
  //   }
  //   const googleMaps = await getGoogleMaps();
  //
  //   let map;
  //   const mapEle = this.mapElement.nativeElement;
  //
  //   map = new googleMaps.Map(mapEle, {
  //     center: {lat: latitude, lng: longitude},
  //     zoom: 16,
  //     styles: style
  //   });
  //   for (const i of Array<number>(5)){
  //       const marker = new googleMaps.Marker({
  //           position: {lat: latitude, lng: longitude},
  //           map,
  //           title: 'Maker q'
  //       });
  //       const infoWindow = new googleMaps.InfoWindow({
  //           content: `<h5>${this.address}</h5>`
  //       });
  //       marker.addListener('click', () => {
  //           if (!this.address) { return false; }
  //           infoWindow.open(map, marker);
  //       });
  //   }
  //   googleMaps.event.addListenerOnce(map, 'idle', () => {
  //     mapEle.classList.add('show-map');
  //   });
  //
  //   const observer = new MutationObserver((mutations) => {
  //     mutations.forEach((mutation) => {
  //       if (mutation.attributeName === 'class') {
  //         const el = mutation.target as HTMLElement;
  //         isDark = el.classList.contains('dark-theme');
  //         if (map && isDark) {
  //           map.setOptions({styles: darkStyle});
  //         } else if (map) {
  //           map.setOptions({styles: []});
  //         }
  //       }
  //     });
  //   });
  //   observer.observe(appEl, {
  //     attributes: true
  //   });
  // }

  async ngAfterViewInit() {
    await this.getCurrentLocation();
  }
}

function getGoogleMaps(): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
  });

}
