import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class AuthService{
    private Token: string | undefined;

    add( token: string){
        this.Token = token;
    }

    getX(){
        //TODO: Token query
    }
}