import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';

import { ResponseDto } from '../dto/response.dto';
import { ListingPatient, Patient } from '../interfaces/patient';

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

    savePatient(patient: Patient){
        //POST
        this.http.post(this.URL, patient).subscribe();
    }
    saveNewPatient(patient: Partial<Patient>){
        //PUT
        this.http.put(this.URL, patient).subscribe();
    }
}