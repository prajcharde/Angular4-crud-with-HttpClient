import { Component, OnInit, TemplateRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { DataserviceService } from "../service/dataservice.service";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
//reactive form declaration
  createform:FormGroup;
  editform:FormGroup;
  deleteform:FormGroup;
  //for edit purpose
  id:number;
  memberName:string;
  memberEmail:string;
  address:string;
//for fetching single record
  post:any;
  //for fetching multiple record
  posts:any;
  //for fetching single record for updation
  model:any;
  //for ngx bootstrap model
  public modalRef: BsModalRef;
  //inject  data and modal services in constructor
  constructor(private service:DataserviceService,private fb:FormBuilder,private modalService: BsModalService) 
  {
    
  }
  //open modal for member creation
 public openModal(template: TemplateRef<any>)
  {
      this.modalRef = this.modalService.show(template);
  }
//open modal for updation
 public openModalforEdit(tempEdit:TemplateRef<any>,model:any)
 {
      this.id=model.memId;
      this.memberName=model.memberName;
      this.memberEmail=model.memberEmail;
      this.address=model;
      this.modalRef = this.modalService.show(tempEdit);
 }
 //open modal to confirm deletion
public openModalforDelete(tempDelete: TemplateRef<any>, model: any) 
{
    this.post = model;
    this.modalRef = this.modalService.show(tempDelete);
}

  ngOnInit() {
//create form validation
    this.createform=this.fb.group({
      memberName:[null,Validators.required],
      memberEmail:[null,[Validators.required,Validators.email]],
      address:[null,Validators.required]
    })
    //edit form validation
    this.editform=this.fb.group({
      memId:[null,Validators.required],
      memberName:[null,Validators.required],
      memberEmail:[null,[Validators.required,Validators.email]],
      address:[null,Validators.required]
    })

     this.deleteform=this.fb.group({
      memId:[null,Validators.required],
      memberName:[null,Validators.required],
      memberEmail:[null,[Validators.required,Validators.email]],
      address:[null,Validators.required]
    })
//get all records from database    
    this.service.getAll().subscribe(data => {
            this.posts = data;
               console.log(this.posts);
        });
  }
//submit method of add member
 onSubmit(model:any)
  {
 this.service.create(model).subscribe(
      data => {   
       window.location.reload();
          },
      
     );
  }
//update method
editUser(model:any)
{
  this.model=model;
  this.model.id=this.id;
    this.service.update(this.model.id,this.model).subscribe(
      data => {    
         window.location.reload();
         },
      
     );
}
//delete method
 deleteUser(model: any) {
    this.id = model.memId
    this.service.delete(this.id).subscribe(
      data => {
        window.location.reload();
      },
    );
  }



}
