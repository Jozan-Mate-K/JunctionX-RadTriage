import { Inject, Injectable} from '@angular/core';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogConfig,
  } from '@angular/material/dialog';
import { ProgressDialogComponent } from '../dialogs/progress-dialog/progress-dialog.component';
import { Observable } from 'rxjs';
import { AppointmentDialogComponent } from '../dialogs/appointment-dialog/appointment-dialog.component';

@Injectable({providedIn:'root'})
export class AppointmentDialogService{

    private dialogRef: MatDialogRef<AppointmentDialogComponent, any> | undefined;

    constructor(public dialog: MatDialog) { 

    }



    openDialog(id: number ){
        this.dialogRef = this.dialog.open(AppointmentDialogComponent, {minWidth: "80%",  data: {id}});
    }

    openEmptyDialog(){
        this.dialogRef = this.dialog.open(AppointmentDialogComponent, { minWidth: "80%",  data: {id: null}});

    }

    close() {
        if (this.dialogRef) {
            this.dialogRef.close();
            this.dialogRef = undefined;
        }
    }

    afterClosed(): Observable<any> | null {
        if (this.dialogRef) {
            return this.dialogRef.afterClosed();
        }
        return null;
    }
}