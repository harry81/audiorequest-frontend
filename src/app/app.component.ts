import { GoogleAnalyticsService} from './ga.service';
import { Router, NavigationEnd} from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'Hoodpub';

    constructor(public router: Router, public ga: GoogleAnalyticsService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.ga.eventEmitter('page', 'move', event.urlAfterRedirects, event.id);
            }
        });
    }

}
