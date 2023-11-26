import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ListingPatient } from 'src/app/interfaces/patient';
import { AppointmentDialogService } from 'src/app/services/appointment-dialog.service';
import { AuthService } from 'src/app/services/auth.service';
import { PatientDialogService } from 'src/app/services/patient-dialog.service';
import { PatientService } from 'src/app/services/patient.service';
import { ProgressDialogService } from 'src/app/services/progress-dialog.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  displayedColumns: string[] = ["Name", "TreatmentStatus", "LastAppointment", "NextAppointment", "Actions"]
  dataSource = new MatTableDataSource<ListingPatient>();

  // for testing
  // dummyData: ListingPatient[] = [
  //   {id: 1, name: "Karcsi", nextAppointment: new Date(), priority: 1, inpatient: false},
  //   {id: 2, name: "Jancsi", nextAppointment: new Date(), priority: 2, inpatient: false},
  //   {id: 3, name: "Marcsi", nextAppointment: new Date(), priority: 5, inpatient: false},
  //   {id: 4, name: "Bácsi", nextAppointment: new Date(), priority: 0, inpatient: false},
  //   {id: 5, name: "Korcsi", nextAppointment: new Date(), priority: 5, inpatient: false},
  // ]

  constructor(
    private progressDialogService: ProgressDialogService,
    private patientService: PatientService,
    private patientDialogService: PatientDialogService,
    private appointmentDialogService: AppointmentDialogService,
    private authService: AuthService){

  }
  ngOnInit(): void {
    this.progressDialogService.openDialog({minWidth: "400px", disableClose: true })
    this.patientService.getListOfPatients().subscribe(n=>{
      this.progressDialogService.close();
      n.result.forEach(element => {
        
        element.LastAppointment = new Date(element.LastAppointment);
        element.NextAppointment = new Date(element.NextAppointment);
        if(element.NextAppointment.toString()  == "Invalid Date"){
          element.NextAppointment = "";
        }
        if(element.LastAppointment.toString()  == "Invalid Date"){
          element.LastAppointment = "";
        }
      });
      this.dataSource.data =  n.result; 
    },(e:HttpErrorResponse)=>{
      if(e.status == 0){
        this.progressDialogService.message = "Could not connect to the server";
      }
      else if(e.status == 404){
        this.progressDialogService.message = "Could not get the list of patients from the server";
      }
      else if(e.status == 500){
        this.progressDialogService.message = "Server error";
      }
      else{
        this.progressDialogService.message = "Unknown error";
      }
      this.progressDialogService.afterClosed()?.subscribe(_=>{
        this.authService.logout();

      })
    })
  }

  openPatientDialog(element: ListingPatient){
    this.patientDialogService.openDialog(element.PatientID);
  }
  openEmptyPatientDialog(){
    this.patientDialogService.openEmptyDialog();
  }
  openAppointmentDialog(element: ListingPatient){
    this.appointmentDialogService.openDialog(element.PatientID);
  }
}
