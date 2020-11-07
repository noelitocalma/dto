import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DtoComponent } from './dto.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: DtoComponent
  }
];

@NgModule({
  declarations: [DtoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DtoModule { }
