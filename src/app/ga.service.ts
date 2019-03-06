import { Injectable } from '@angular/core';

declare let gtag: Function; // Declare gtag as a function

@Injectable({
  providedIn: 'root'
})

export class GoogleAnalyticsService {

    constructor() { }

    public eventEmitter(eventCategory: string,
                        eventAction: string,
                        eventLabel: string = null,
                        eventValue: number = null) {
        gtag('event', eventAction, {
            'event_category': eventCategory,
            'event_label': eventLabel,
            'event_value': eventValue
        });

    }
}
