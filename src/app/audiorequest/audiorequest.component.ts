import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators} from '@angular/forms';
import { AudioService } from '../audio.service';


class AudioSnippet {
    constructor(public src: string, public file: File) {}
}

@Component({
    selector: 'app-audiorequest',
    templateUrl: './audiorequest.component.html',
    styleUrls: ['./audiorequest.component.scss']
})
export class AudiorequestComponent implements OnInit {

    name = '';

    audioFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    constructor(private audioService: AudioService){

    }

    selectedFile: AudioSnippet;

    onSubmit(f: NgForm) {
        console.log(f.value);
        console.log(f);
        console.log('audioform', this.audioFormControl.value);
    }

    processFile(audioInput: any) {
        const file: File = audioInput.files[0];
        const reader = new FileReader();
        this.name = 'start';

        reader.addEventListener('load', (event: any) => {

            this.selectedFile = new AudioSnippet(event.target.result, file);

            this.audioService.uploadFile(this.selectedFile.file).subscribe(
                (res) => {
                    this.name = res.script;
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
