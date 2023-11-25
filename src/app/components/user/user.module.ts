import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { FloorplanComponent } from './floorplan/floorplan.component';
import { UserGuard } from 'src/app/guards/User.guard';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path: "", redirectTo: "patients", pathMatch: "full"},
  {path: "patients",canActivate: [UserGuard], pathMatch: 'full', component: PatientsComponent},
  {path: "floorplan",canActivate: [UserGuard], pathMatch: 'full', component: FloorplanComponent}

]

@NgModule({
  declarations: [
    PatientsComponent,
    FloorplanComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSortModule,
    ReactiveFormsModule
  ]
})
export class UserModule{}