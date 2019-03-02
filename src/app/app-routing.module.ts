import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudiorequestComponent } from './audiorequest/audiorequest.component';
import { ArDetailComponent } from './ar-detail/ar-detail.component';
import { IntroComponent } from './intro/intro.component';


const routes: Routes = [
    { path: 'ar', component: AudiorequestComponent },
    { path: 'ar-detail/:uuid', component: ArDetailComponent },
    { path: '', component: IntroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
