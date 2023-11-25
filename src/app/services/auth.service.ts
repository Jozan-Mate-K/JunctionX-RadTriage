import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class AuthService{

    add( token: string){
        localStorage.setItem("token", token)
    }

    getIsLoggedIn(): boolean{
        let token = localStorage.getItem("token");
        return token != null;
    }

    getX(){
        //TODO: Token query
    }

    logout(): void{
        localStorage.removeItem("token");
    }
}