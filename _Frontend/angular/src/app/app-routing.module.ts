import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooldalComponent } from './fooldal/fooldal.component';
import { AsztalFoglalasComponent } from './asztal-foglalas/asztal-foglalas.component';

const routes: Routes = [
  {path:'fooldal', component: FooldalComponent},
  {path:'asztalfoglalas', component: AsztalFoglalasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
