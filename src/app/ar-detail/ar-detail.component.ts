import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AudioService } from '../audio.service';


@Component({
    selector: 'app-ar-detail',
    templateUrl: './ar-detail.component.html',
    styleUrls: ['./ar-detail.component.scss']
})
export class ArDetailComponent implements OnInit {

    constructor(private audioService: AudioService, private route: ActivatedRoute) {
        this.uuid = this.route.snapshot.paramMap.get("uuid");
        this.load_stt();
    }

    ngOnInit() {
    }

    load_stt() {
        this.audioService.get_stt(this.uuid).subscribe((response) => {
            console.log(response.stt);
            this.stt = response.stt;
            this.uuid = this.stt.uuid;
        });
    }
}
