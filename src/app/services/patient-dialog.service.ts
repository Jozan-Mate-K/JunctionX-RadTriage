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
import { PatientDialogComponent } from '../dialogs/patient-dialog/patient-dialog.component';

@Injectable({providedIn:'root'})
export class PatientDialogService{

    private dialogRef: MatDialogRef<PatientDialogComponent, any> | undefined;

    constructor(public dialog: MatDialog) { 

    }


    openDialog(id: number ){
        this.dialogRef = this.dialog.open(PatientDialogComponent, {data: {id}});
    }

    openEmptyDialog(){
        this.dialogRef = this.dialog.open(PatientDialogComponent, {data: {id: null}});

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