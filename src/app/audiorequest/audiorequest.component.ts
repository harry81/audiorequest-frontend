import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators} from '@angular/forms';
import { AudioService } from '../audio.service';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

/* Status
   - ready
   - wip
   - uploaded
   - sented

 */
class AudioSnippet {
    constructor(public src: string, public file: File) {}
}

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

    constructor(private audioService: AudioService, public dialog: MatDialog){ }

    selectedFile: AudioSnippet;

    onSubmit(f: NgForm) {
        console.log(f.value);
        console.log('audioform', this.audioForm);
    }

    notify() {
        const dialogRef = this.dialog.open(NotifyDialogComponent, {
            width: '250px',
            data: { email: 'chharry@gmail.com',
                    selectedlanguage: 'ko-KR'}
        });

        dialogRef.afterClosed().subscribe(res => {
            this.progress = 'wip';
            console.log('data ', res);

            if (res) {
                this.audioService.notify(this.stt_id, res).subscribe((response) => {
                    this.response_notify = response.message;
                    this.progress = 'sent';
                });
            }
        });
    }

    transcribe() {
        console.log(this.stt_id);
        this.audioService.transcribe(this.stt_id).subscribe(
            (res) => {
                this.script = res.script;
            });
    }

    uploadFile($event) {
        this.audiofile = $event.target.files[0];
        if ($event.target.files.length < 1) {
            return 0;
        }

        const file: File = $event.target.files[0];
        const reader = new FileReader();
        this.progress = 'wip';

        reader.addEventListener('load', (event: any) => {

            this.selectedFile = new AudioSnippet(event.target.result, file);

            this.audioService.uploadFile(this.selectedFile.file).subscribe(
                (res) => {
                    this.path = res.path;
                    this.stt_id = res.id;
                    this.progress = 'uploaded';
                    this.response_notify = '';
                },
                (err) => {
                    console.log(err);
                });
        });

        reader.readAsDataURL(file);
    }
    ngOnInit() {
    }

}
