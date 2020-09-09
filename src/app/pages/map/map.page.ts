import { Component, ViewChild, Inject, ElementRef, NgZone, DoCheck, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {ModalController, Platform} from '@ionic/angular';
import { darkStyle } from './map-dark-style';
import { environment } from '@src/environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {InviteUserGroupPage} from '@pages/modalPages/invite-user-group/invite-user-group.page';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements  OnInit, OnDestroy{
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  private latitude: number;
  private longitude: number;
  constructor(
      @Inject(DOCUMENT) private doc: Document,
      public platform: Platform,
      public modalCtrl: ModalController,
      private geolocation: Geolocation
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
   // await this.onChanges();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // window.removeEventListener('volumebuttonslistener')
      window.addEventListener('volumebuttonslistener', async (e) => {
        console.log('Button pressed: ' + e);
        await this.getCurrentLocation();
        const modal = await this.modalCtrl.create({
          component: InviteUserGroupPage,
          componentProps: {group: ''}
        });
      }, false);
    });
  }

  // async onChanges() {
  //   this.getLocation();
  //   this.volumeEvent.subscribe( data => {
  //     console.log('onchanges');
  //     console.log(data);
  //     if (!data) { return false; }
  //     if (data.signal === 'volume-down'){
  //       console.log('I am here');
  //       this.getLocation();
  //     }
  //   });
  //
  // }

 async getCurrentLocation(){
    this.geolocation.getCurrentPosition().then(async (res) => {
      console.log(res);
      this.latitude = res.coords.latitude;
      this.longitude = res.coords.longitude;
      await this.mapHandler(res.coords.latitude, res.coords.longitude);
    });
  }

  async ngAfterViewInit() {
    await this.getCurrentLocation();
    await this.mapHandler(1.344, 1.444);
  }

  async mapHandler(latitude: number, longitude: number){
    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }
    const googleMaps = await getGoogleMaps(
        environment.APIKEY
    );

    let map;
    const mapEle = this.mapElement.nativeElement;

    map = new googleMaps.Map(mapEle, {
      center: {lat: latitude, lng: longitude},
      zoom: 16,
      styles: style
    });
    const infoWindow = new googleMaps.InfoWindow({
      content: `<h5>Monona Terrace Convention Center</h5>`
    });

    const marker = new googleMaps.Marker({
      position: {lat: latitude, lng: longitude},
      map,
      title: 'Maker q'
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    googleMaps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains('dark-theme');
          if (map && isDark) {
            map.setOptions({styles: darkStyle});
          } else if (map) {
            map.setOptions({styles: []});
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true
    });
  }
  // ionViewDidLeave(){
  //   window.removeEventListener('volumebuttonslistener', this.onVolumeButtonsListener, false);
  // }
  ngOnDestroy(){
    window.removeEventListener('volumebuttonslistener', () => {}, false);
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });

}
