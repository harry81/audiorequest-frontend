import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudiorequestComponent } from './audiorequest/audiorequest.component';


const routes: Routes = [
    { path: 'audiorequest', component: AudiorequestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
