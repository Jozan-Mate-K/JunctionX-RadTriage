import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ListingPatient } from 'src/app/interfaces/patient';
import { PatientDialogService } from 'src/app/services/patient-dialog.service';
import { PatientService } from 'src/app/services/patient.service';
import { ProgressDialogService } from 'src/app/services/progress-dialog.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  displayedColumns: string[] = ["name", "status", "lastAppointment", "nextAppointment", "priority", "inpatient"]
  dataSource: ListingPatient[] = [];

  // for testing
  dummyData: ListingPatient[] = [
    {id: 1, name: "Karcsi", nextAppointment: new Date(), priority: 1, inpatient: false},
    {id: 2, name: "Jancsi", nextAppointment: new Date(), priority: 2, inpatient: false},
    {id: 3, name: "Marcsi", nextAppointment: new Date(), priority: 5, inpatient: false},
    {id: 4, name: "Bácsi", nextAppointment: new Date(), priority: 0, inpatient: false},
    {id: 5, name: "Korcsi", nextAppointment: new Date(), priority: 5, inpatient: false},
  ]

  constructor(
    private progressDialogService: ProgressDialogService,
    private patientService: PatientService,
    private patientDialogService: PatientDialogService){

  }
  ngOnInit(): void {
    this.progressDialogService.openDialog({minWidth: "400px", disableClose: true })
    this.dataSource = this.dummyData;
    this.patientService.getListOfPatients().subscribe(n=>{
      this.progressDialogService.close();
    },(e:HttpErrorResponse)=>{
      if(e.status == 0){
        this.progressDialogService.message = "Could not connect to the server";
      }
      else if(e.status == 404){
        this.progressDialogService.message = "Could not get the list of patients from the server";
      }
      else{
        this.progressDialogService.message = "Unknown error";
      }
    })
  }

  openPatientDialog(element: ListingPatient){
    this.patientDialogService.openDialog(element.id);
  }
  openEmptyPatientDialog(){
    this.patientDialogService.openEmptyDialog();
  }
}
