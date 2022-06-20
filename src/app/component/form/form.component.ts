import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
catagory = ["Fruit","Juice","Cake"];
freshness = ["Fresh","Non-Fresh"];
  constructor(private fb: FormBuilder,  private apiser: ApiService, private matdialogRef: MatDialogRef<FormComponent>) { }
  productfrm! : FormGroup;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  ngOnInit(): void {
    this.productfrm = this.fb.group({
      name: ['',Validators.required],
      cata: ['',Validators.required],
      date: ['',Validators.required],
      fresh: ['',Validators.required]
    })
  }

  savepro(){
    if(this.productfrm.valid){
      this.apiser.postproduct(this.productfrm.value).subscribe({
        next:(res)=>{
          alert('Product added successfully');
          this.productfrm.reset();
          this.matdialogRef.close();
        }, error:()=>{
          alert('error while adding the product');
        }
      })
    }
  }

}
