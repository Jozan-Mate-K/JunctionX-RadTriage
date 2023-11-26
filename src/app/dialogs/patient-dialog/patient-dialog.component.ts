import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor } from 'src/app/interfaces/doctor';
import { Patient } from 'src/app/interfaces/patient';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { ProgressDialogService } from 'src/app/services/progress-dialog.service';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css']
})
export class PatientDialogComponent implements OnInit {

  controls = {
    Name: new FormControl(),
    ContactNumber: new FormControl(),
    Email: new FormControl(),
    Address: new FormControl(),
    AffectedOrgan: new FormControl(),
    NotificationPreference: new FormControl(),
    TreatmentStatus: new FormControl(),
    Height: new FormControl(),
    Weight: new FormControl(),
    Doctor: new FormControl(),
    BirthDate: new FormControl(),
    Inpatient: new FormControl()
  }
  formGroup = new FormGroup(this.controls);
  
  patient?: Patient;

  doctors?: Doctor[];

  newPatient: boolean = false;

  options: string[] =[
    "Brain",
    "Spine",
    "Head",
    "Lung",
    "Breast",
    "Esophagus",
    "Stomach",
    "Rectum",
    "Uterus",
    "Prostate",
    "Bladder",
    "Liver",
    "Bones"
] 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private progressDialogService: ProgressDialogService,
    private patientService: PatientService,
    private doctorService: DoctorService
  ){
    
  }
  ngOnInit(): void {
    if(this.data.id != null){
      this.newPatient = false;
      this.progressDialogService.openDialog({minWidth: "400px", disableClose: false})
      this.patientService.getPatient(this.data.id).subscribe(n=>{
        this.progressDialogService.close();
        this.patient = n.result
        this.patient.BirthDate = new Date(this.patient.BirthDate)
        console.log(this.patient.Doctor)
        this.formGroup.patchValue(this.patient);
      
        this.doctorService.getAll().subscribe(n=>{
          this.doctors = n.result
        },
        (e:HttpErrorResponse)=>{
          if(e.status == 0){
            this.progressDialogService.message = "Could not connect to the server, please try again";
        }
        else if(e.status == 409){
            this.progressDialogService.message = e.error.errorMessage;
        }
        else if(e.status == 500){
            this.progressDialogService.message = "Server error";
        }
        else{
            this.progressDialogService.message = "Unknown error";
        }
        })
      },
      (e:HttpErrorResponse)=>{
        if(e.status == 0){
          this.progressDialogService.message = "Could not connect to the server, please try again";
      }
      else if(e.status == 409){
          this.progressDialogService.message = e.error.errorMessage;
      }
      else if(e.status == 500){
          this.progressDialogService.message = "Server error";
      }
      else{
          this.progressDialogService.message = "Unknown error";
      }
      })
      // setTimeout(()=>{
      //   this.progressDialogService.close();
      // }, 1000)
    }else{
      this.newPatient = true;
      this.doctorService.getAll().subscribe(n=>{
        console.log(n.result)
        this.doctors = n.result
      },
      (e:HttpErrorResponse)=>{
        if(e.status == 0){
          this.progressDialogService.message = "Could not connect to the server, please try again";
      }
      else if(e.status == 409){
          this.progressDialogService.message = e.error.errorMessage;
      }
      else if(e.status == 500){
          this.progressDialogService.message = "Server error";
      }
      else{
          this.progressDialogService.message = "Unknown error";
      }
      })
    }

    // this.patientService.getPatient(this.data.id).subscribe(n=>{
    //   n.result
    // })
  }
  save(){
    this.formGroup.markAllAsTouched();
    if(this.formGroup.valid){
      if(!!this.patient){
        this.patient.Name = this.formGroup.value.Name
        this.patient.ContactNumber = this.formGroup.value.ContactNumber
        this.patient.Email = this.formGroup.value.Email
        this.patient.Address = this.formGroup.value.Address
        this.patient.AffectedOrgan = this.formGroup.value.AffectedOrgan
        this.patient.NotificationPreference = this.formGroup.value.NotificationPreference
        this.patient.TreatmentStatus = this.formGroup.value.TreatmentStatus
        this.patient.Height = this.formGroup.value.Height
        this.patient.Weight = this.formGroup.value.Weight
        if(this.doctors != null){
          this.patient.Doctor = this.doctors.find(e => e.Name == this.formGroup.value.Doctor)

        }
        this.patient.BirthDate = new Date(this.formGroup.value.BirthDate).toUTCString()
        this.patient.Inpatient = this.formGroup.value.Inpatient

        this.patientService.savePatient(this.patient);
        console.log(this.patient)
      }else{
        this.patientService.saveNewPatient(this.formGroup.value)
      }
    }
  }
}
