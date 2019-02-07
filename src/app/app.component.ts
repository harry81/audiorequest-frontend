import { Component } from '@angular/core';
import { NgForm, FormControl, Validators} from '@angular/forms';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    audioFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    title = 'audio request';

    onSubmit(f: NgForm) {
        console.log(f.value);
        console.log(f);
        console.log('audioform', this.audioFormControl.value);
    }
}
