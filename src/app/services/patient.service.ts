import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './environment';
import { AuthService } from './auth.service';

import { LoginDTO } from '../dto/login.dto';
import { ResponseDto } from '../dto/response.dto';
import { ProgressDialogService } from './progress-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingPatient, Patient } from '../interfaces/patient';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PatientService {
    readonly URL = environment.backendURL + "/patients";

    constructor(private http: HttpClient) {}


    getListOfPatients(){
        return this.http.get<ResponseDto<ListingPatient[]>>(this.URL);
    }
    getPatient(id: number){
        return this.http.get<ResponseDto<Patient>>(this.URL, {params: {id}});
    }
}