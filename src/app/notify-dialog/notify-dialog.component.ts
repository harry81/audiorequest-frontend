import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';


export interface LanguageSelect {
  value: string;
  viewValue: string;
}

export interface DialogData {
    email: string;
    language: string;
}

@Component({
    selector: 'app-notify-dialog',
    templateUrl: './notify-dialog.component.html',
    styleUrls: ['./notify-dialog.component.scss']
})
export class NotifyDialogComponent {
    languages: LanguageSelect[] = [
        {value: 'ko-KR', viewValue: '한국어'},
        {value: 'en-GB', viewValue: '영어'},
        {value: 'fr-FR', viewValue: '프랑스어'},
        {value: 'de-DE', viewValue: '독일'},
        {value: 'cmn-Hans-HK', viewValue: '중국어, 북경어(간체, 홍콩)'},
        {value: 'ru-RU', viewValue: '러시아어'},
        {value: 'ja-JP', viewValue: '일본어'},
    ];
    language: string;
    email: string;

    constructor(
        public dialogRef: MatDialogRef<NotifyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
