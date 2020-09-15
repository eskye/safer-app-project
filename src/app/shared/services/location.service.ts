import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { IAddress, ILocation } from '@app/shared/core/model/ILocation';

@Injectable({
    providedIn: 'root'
})

export class LocationService {
    location: ILocation = {
        longitude: 1.3344,
        latitude: 1.23344
    };
    address: IAddress = {
        address: ''
    };
    public nativeGeocoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };

    constructor(private geolocation: Geolocation,
                private nativeGeocoder: NativeGeocoder) {
    }

    /**
     * return Promise<ILocation>
     * Get the latitude and longitude of a particular location
     */
    async getCurrentLocation(): Promise<ILocation> {
        this.geolocation.getCurrentPosition().then((res) => {
            this.location = {
                longitude: res.coords.longitude,
                latitude: res.coords.latitude
            };
        });
        return this.location;
    }

    /**
     * @param lat
     * @param long
     * return IAddress
     * Get address of a location using the latitude and longitude
     */
    getAddress(lat, long): IAddress {
        this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
            .then((res: NativeGeocoderResult[]) => {
                console.log(res);
                if(res.length === 0) { return; }
                this.address = {
                    address: this.pretifyAddress(res[0])
                };
            });
        return this.address;
    }

    // address
    public pretifyAddress(address) {
        const obj = [];
        let data = '';
        // tslint:disable-next-line:forin
        for (const key in address) {
            obj.push(address[key]);
        }
        obj.reverse();
        for (const val in obj) {
            if (obj[val].length) {
                data += obj[val] + ', ';
            }
        }
        return data.slice(1, -2);
    }
}
