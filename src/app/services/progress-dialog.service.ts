import { Injectable} from '@angular/core';
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

@Injectable({providedIn:'root'})
export class ProgressDialogService{

    private dialogRef: MatDialogRef<ProgressDialogComponent, any> | undefined;

    constructor(public dialog: MatDialog) { 

    }

    set message(value:string){
        if(!this.dialogRef){
            return;
        }
        this.dialogRef.componentInstance.message = value;
    }

    openDialog(config: MatDialogConfig){
        this.dialogRef = this.dialog.open(ProgressDialogComponent, config);
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