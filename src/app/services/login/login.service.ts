import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment.service';


@Injectable({providedIn: 'root'})
export class LoginService {
    readonly URL = environment.backendURL + "/login";
    loggedIn: boolean = false;

    constructor(private http: HttpClient) {}

    login(username: string, password: string ){
        this.http.post<ResponseDto<string>>(this.URL,{
            username: username,
            password: password
        }).subscribe(n=> {
            console.log(n.data)
            if(n.data == "success"){
                this.loggedIn = true;
            }else{
                this.loggedIn = false;
            }
        });
        return this.loggedIn;
    }

    
}

export class ResponseDto<T>{
    data: T | undefined;
}