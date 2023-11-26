import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "./environment";
import { ResponseDto } from "../dto/response.dto";
import { Doctor } from "../interfaces/doctor";

@Injectable({providedIn: 'root'})
export class DoctorService{
    readonly URL = environment.backendURL + '/doctor';
    constructor(private http: HttpClient){

    }
    getAll(){
        return this.http.get<ResponseDto<Doctor[]>>(this.URL);
    }
}