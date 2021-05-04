import { Component, OnInit, Inject } from '@angular/core';
import { MessageTestService } from 'app/services/messageTest.service';
import { fuseAnimations } from '@fuse/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'app/dialog-box/dialog-box.component';

@Component({
  selector: 'app-comic-templates',
  templateUrl: './comic-templates.component.html',
  styleUrls: ['./comic-templates.component.scss'],
  animations: fuseAnimations
})
export class ComicTemplatesComponent implements OnInit {
templateId: string
  constructor( 
    private messageService: MessageTestService,
    public dialogRef: MatDialogRef<ComicTemplatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
   
  ) { }

  ngOnInit() {

   
  }

  makePageWithTemplate(templateId: string){
   this.templateId = templateId
   //console.log(this.templateId)
  }

  sendId(){
    this.dialogRef.close(this.templateId)
  }

}
