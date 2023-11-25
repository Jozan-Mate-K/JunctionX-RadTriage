import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { FloorplanComponent } from './floorplan/floorplan.component';

const routes: Routes = [
  {path: "", redirectTo: "patients", pathMatch: "full"},
  {path: "patients", pathMatch: 'full', component: PatientsComponent},
  {path: "floorplan", pathMatch: 'full', component: FloorplanComponent}

]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [
    PatientsComponent,
    FloorplanComponent
  ]
})
export class UserModule{}