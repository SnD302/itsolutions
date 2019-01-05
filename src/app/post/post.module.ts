import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

export const routes = [
  { path: '', component: PostComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,FormsModule
  ],
  declarations: [PostComponent]
})
export class PostModule { }
