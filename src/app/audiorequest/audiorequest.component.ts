import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators} from '@angular/forms';
import { AudioService } from '../audio.service';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


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
    progress = 'Ready';
    stt_id = '';
    email = '';

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

    openDialog(): void {
        const dialogRef = this.dialog.open(NotifyDialogComponent, {
            width: '250px',
            data: {animal: 'chharry@gmail.com'}
        });

        dialogRef.afterClosed().subscribe(email => {
            this.notify(email);
        });
    }

    notify() {
        const dialogRef = this.dialog.open(NotifyDialogComponent, {
            width: '250px',
            data: {animal: 'chharry@gmail.com'}
        });

        dialogRef.afterClosed().subscribe(email => {
            console.log('email:' + email);

            this.audioService.notify(this.stt_id, email).subscribe((res) => {
                this.script = res.script;
            });
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
        this.progress = 'start';

        reader.addEventListener('load', (event: any) => {

            this.selectedFile = new AudioSnippet(event.target.result, file);

            this.audioService.uploadFile(this.selectedFile.file).subscribe(
                (res) => {
                    this.path = res.path;
                    this.stt_id = res.id;
                    // this.script = res.script;
                    this.progress = 'uploaded';
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
