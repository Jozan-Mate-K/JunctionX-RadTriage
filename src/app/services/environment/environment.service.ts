import { Component, Injectable, OnInit } from '@angular/core';

@Injectable({providedIn: "root"})

export class EnvironmentService implements OnInit {
    backendURL: string = "http://192.168.0.69:5000"

    constructor() { }

    ngOnInit() { }
}