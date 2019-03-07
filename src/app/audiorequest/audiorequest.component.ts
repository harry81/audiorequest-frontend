import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators} from '@angular/forms';
import { AudioService } from '../audio.service';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GoogleAnalyticsService} from '../ga.service';


/* Status
   - ready
   - wip
   - uploaded
   - sented

*/

declare let gtag: Function; // Declare gtag as a function


@Component({
    selector: 'app-audiorequest',
    templateUrl: './audiorequest.component.html',
    styleUrls: ['./audiorequest.component.scss']
})
export class AudiorequestComponent implements OnInit {

    script = '';
    isSelected = false;
    audiofile = '';
    path = '';
    progress = 'ready';
    stt_id = '';
    email = '';
    response_notify = '';

    audioForm = new FormGroup({
        audiofile: new FormControl('', [Validators.required, ]),
        email: new FormControl('', [Validators.required, Validators.email, ])
    });

    constructor(private audioService: AudioService,
                public dialog: MatDialog,
                public ga: GoogleAnalyticsService) {

    }

    notify() {
        this.ga.eventEmitter('audio', 'notify');

        const dialogRef = this.dialog.open(NotifyDialogComponent, {
            width: '250px',
            data: { email: 'chharry@gmail.com', language: 'ko-KR'}
        });

        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.ga.eventEmitter('audio', 'notify_ready');

                this.progress = 'wip';
                this.audioService.notify(this.stt_id, res).subscribe((response) => {
                    this.response_notify = response.message;
                    this.progress = 'sent';
                });
            }
        });
    }

    transcribe() {
        this.audioService.transcribe(this.stt_id).subscribe(
            (res) => {
                this.script = res.script;
            });
    }

    uploadFile($event) {
        this.ga.eventEmitter('audio', 'uploadFile');
        this.clean_page();

        const reader = new FileReader();
        let file: File;
        this.progress = 'wip';

        if ($event.target.files) {
            file = $event.target.files[0];
        }

        this.audioService.uploadFile(file).subscribe(
            (res) => {
                this.path = res.path;
                this.stt_id = res.id;
                this.progress = 'uploaded';
                this.response_notify = '';
            },
            (err) => {
                console.log(err.error);
                this.response_notify = err.error.message;
                this.progress = 'failed';
            });
    }

    clean_page() {
        this.response_notify = '';
    }
    ngOnInit() {
    }

}
