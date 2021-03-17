import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
@Component({
  selector: 'app-download-dialog-component',
  templateUrl: './download-dialog-component.component.html',
  styleUrls: ['./download-dialog-component.component.css']
})
export class DownloadDialogComponentComponent {

  constructor( 
    public dialogRef: MatDialogRef<DownloadDialogComponentComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { } 
  
  onCancel(): void { 
    this.dialogRef.close(); 
  } 

  

}
