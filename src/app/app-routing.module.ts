import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestautomatchComponent } from './components/testautomatch/testautomatch.component';

const routes: Routes = [
  {path: 'symptoms', component:TestautomatchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
