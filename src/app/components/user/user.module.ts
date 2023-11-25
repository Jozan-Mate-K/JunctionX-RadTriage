import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { FloorplanComponent } from './floorplan/floorplan.component';

const routes: Routes = [
    {path: "patients", component: PatientsComponent},
    {path: "floorplan", component: FloorplanComponent}

]

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
    PatientsComponent,
    FloorplanComponent
  ]
})
export class UserModule{}