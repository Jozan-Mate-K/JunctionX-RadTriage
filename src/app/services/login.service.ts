import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './environment';
import { AuthService } from './auth.service';

import { LoginDTO } from '../dto/login.dto';
import { ProgressDialogService } from './progress-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginService {
    readonly URL = environment.backendURL + "/login";

    constructor(private http: HttpClient,
        private authService: AuthService,
        private dialogService: ProgressDialogService,
        private router: Router,
        private route: ActivatedRoute) {}

    login(username: string, password: string ){
        this.dialogService.openDialog({ minWidth: "400px", disableClose: true});
        this.http.post<ResponseDto<LoginDTO>>(this.URL,{
            username: username,
            password: password
        }).subscribe(n=> {
            //TODO: token 
            this.dialogService.close()
            if(!!n.result.token){
                this.authService.add(n.result.token);
                this.router.navigate(['user/patients']);
            }else{
            }
        },
        (e: HttpErrorResponse)=>{
            if(e.status == 0){
                this.dialogService.message = "Could not connect to the server, please try again";
            }
            else if(e.status == 409){
                this.dialogService.message = e.error.errorMessage;
            }
            else{
                this.dialogService.message = "Unknown error";
            }
            //TODO: error handling
            // if(e.status == 400){

            // }
        });
    }

    
}

export class ResponseDto<T>{
    result!: T;
    errorMessage?: string | undefined; 
}