import { Component, OnInit, Inject } from '@angular/core';
import FroalaEditor from 'froala-editor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData{
  article: any
}


@Component({
  selector: 'app-article-writer',
  templateUrl: './article-writer.component.html',
  styleUrls: ['./article-writer.component.scss']
})
export class ArticleWriterComponent implements OnInit {

  constructor(

    public dialogRef: MatDialogRef<ArticleWriterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    FroalaEditor.DefineIcon('alert', { SVG_KEY: 'help' });
    FroalaEditor.RegisterCommand('alert', {
        title: 'Hello',
        focus: false,
        undo: false,
        refreshAfterCallback: false,

        callback: function () {
            // alert('Hello!');
        }
    });
   }

  ngOnInit() {
  }

}
