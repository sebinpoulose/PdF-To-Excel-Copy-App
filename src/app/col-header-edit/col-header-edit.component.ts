import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-col-header-edit',
  templateUrl: './col-header-edit.component.html',
  styleUrls: ['./col-header-edit.component.css']
})
export class ColHeaderEditComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  constructor( 
    public dialogRef: MatDialogRef<ColHeaderEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onCancel(): void { 
    this.dialogRef.close(this.data); 
  } 
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      for (const elem of this.data) {
        if(elem.field==value.trim()){
          input.value = '';
          return;
        }
      }
      this.data.push({field:value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.data.indexOf(fruit);

    if (index >= 0) {
      this.data.splice(index, 1);
    }
  }

  onSave():void{
    this.dialogRef.close(this.data); 
  }
}
