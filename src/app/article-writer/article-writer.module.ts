import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleWriterComponent } from './article-writer.component';
import { FroalaViewModule, FroalaEditorModule } from 'src';
import { FroalaComponent } from 'app/main/boards/profile/tabs/timeline/froala.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes=[
  {
    path:'',
    component: ArticleWriterComponent
  }
]


@NgModule({
  imports: [
    CommonModule,
    FroalaViewModule,
    FroalaEditorModule,
    RouterModule.forChild(routes)

  ],
  declarations: [ArticleWriterComponent]
})
export class ArticleWriterModule { }
