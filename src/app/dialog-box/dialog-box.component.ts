import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 
import { MessageService } from 'app/services/message.service';
export interface DialogData {
  error1: string;
  name: string;
  imagePath: string;
  warningMessage: string;
}
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent  {
  
  constructor(
    private messageService: MessageService,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      dialogRef.disableClose=true;
    }

    deletePost(){
      this.dialogRef.close(true)
    }
  
    closeDialog() {
      this.dialogRef.close(false);
    }
}
