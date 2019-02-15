import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
    animal: string;
    name: string;
}


@Component({
    selector: 'app-notify-dialog',
    templateUrl: './notify-dialog.component.html',
    styleUrls: ['./notify-dialog.component.scss']
})
export class NotifyDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<NotifyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
