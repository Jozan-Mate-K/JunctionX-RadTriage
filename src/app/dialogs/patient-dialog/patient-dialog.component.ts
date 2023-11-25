import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patient.service';
import { ProgressDialogService } from 'src/app/services/progress-dialog.service';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css']
})
export class PatientDialogComponent implements OnInit {

  controls = {
    name: new FormControl(),
    email: new FormControl(),
    inpatient: new FormControl()
  }
  formGroup = new FormGroup(this.controls);
  patient?: Patient;

  newPatient: boolean = false;

  dummyData: Patient = {
    id: 1,
    name: "Karcsi",
    email: "Karcsi@gmail.com"
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private progressDialogService: ProgressDialogService,
    private patientService: PatientService
  ){
    
  }
  ngOnInit(): void {
    if(this.data.id != null){
      this.newPatient = false;
      this.progressDialogService.openDialog({minWidth: "400px", disableClose: false})
      setTimeout(()=>{
        this.progressDialogService.close();
        this.patient = this.dummyData;
      }, 1000)
    }else{
      this.newPatient = true;
    }

    // this.patientService.getPatient(this.data.id).subscribe(n=>{
    //   n.result
    // })
  }
}
