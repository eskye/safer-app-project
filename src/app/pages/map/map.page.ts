import { Component, ViewChild, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@ionic/angular';
import { darkStyle } from './map-dark-style';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public platform: Platform
  ) {}

  async ngAfterViewInit() {
    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps(
      'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw'
    );

    let map;
    const mapEle = this.mapElement.nativeElement;

    map = new googleMaps.Map(mapEle, {
      center: {lat: 1.4455, lng: 3.445},
      zoom: 16,
      styles: style
    });
    const infoWindow = new googleMaps.InfoWindow({
      content: `<h5>Monona Terrace Convention Center</h5>`
    });

    const marker = new googleMaps.Marker({
      position: {lat: 1.4455, lng: 3.445},
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
