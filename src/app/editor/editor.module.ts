import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FroalaComponent } from './froala.component';
import { EditorComponent } from './editor.component';
import { RouterModule } from '@angular/router';
import 'froala-editor/js/plugins.pkgd.min.js';
import { FroalaEditorModule, FroalaViewModule } from 'src';
const routes = [
  {
    path: '',
    component: EditorComponent
  }
]

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, FroalaEditorModule, FroalaViewModule,RouterModule.forChild(routes)
  ],
  declarations: [
    FroalaComponent,
    EditorComponent
  ]
})
export class EditorModule { }
