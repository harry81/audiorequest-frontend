import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators} from '@angular/forms';
import { AudioService } from '../audio.service';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GoogleAnalyticsService} from '../ga.service';

import { DomSanitizer } from '@angular/platform-browser';

/* Status
   - ready
   - selected
   - wip
   - uploaded
   - sented

* 파일 선택
 - upload 가능한 url 얻기
 - 미리 듣기 가능

* 변환
  - 파일 업로드
  - 파일형식 변환
  - 텍스트로 변환

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
    path;
    progress = 'ready';
    stt_id = '';
    email = '';
    response_notify = '';
    presigned_post: any;
    file: File;

    audioForm = new FormGroup({
        audiofile: new FormControl('', [Validators.required, ]),
        email: new FormControl('', [Validators.required, Validators.email, ])
    });

    constructor(private audioService: AudioService,
                public dialog: MatDialog,
                public ga: GoogleAnalyticsService,
                private sanitization: DomSanitizer) {

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
                });
            }
        });
    }

    request_transcribe() {
        /*
          - 파일 업로드
            - 파일형식 변환
            - 텍스트로 변환
        */
        this.ga.eventEmitter('audio', 'request_transcribe');
        const dialogRef = this.dialog.open(NotifyDialogComponent, {
            width: '250px',
            data: { email: 'chharry@gmail.com', language: 'ko-KR'}
        });

        dialogRef.afterClosed().subscribe(to_info => {
            if (to_info) {
                this.ga.eventEmitter('audio', 'notify_ready');

                this.progress = 'wip';
                this.audioService.uploadFile(this.presigned_post, this.file).subscribe(
                    (res_upload) => {
                        this.transcribe(to_info);
                    },
                    (error) => {
                        console.log('error upload', error);
                    }
                );
            }
        });
    }

    transcribe(to_info: any) {
        this.audioService.transcribe('10', this.presigned_post['fields']['key'], this.file.name, to_info).subscribe(
            (res) => {
                this.script = res.script;
                this.response_notify = res.message;

            },
            (err) => {},
            () => {
                this.progress = 'sent';
            });
    }

    chooseFile($event) {
        this.ga.eventEmitter('audio', 'uploadFile');
        this.clean_page();

        const reader = new FileReader();

        if ($event.target.files) {
            this.file = $event.target.files[0];
        }

        const url = URL.createObjectURL(this.file);
        this.path = this.sanitization.bypassSecurityTrustUrl(url);

        this.audioService.presigned_post(this.file.name).subscribe(
            (presigned_post) => {
                this.progress = 'selected';
                this.presigned_post = presigned_post;
            },
            (err) => {
                console.log('error');
            });

    }

    clean_page() {
        this.response_notify = '';
    }

    ngOnInit() {
    }

}
