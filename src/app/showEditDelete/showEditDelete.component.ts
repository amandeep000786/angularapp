import { Component, OnInit } from "@angular/core";
import {
  NgForm,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from "@angular/forms";
import { CommonService } from "../common.service";
import { Http } from "@angular/http";

@Component({
  selector: "app-page",
  templateUrl: "./showEditDelete.component.html",
  styleUrls:["./showEditDelete.component.css"]
})
export class showEditDeleteComponent implements OnInit {
  filename: string;
  flag: boolean = false;
  filenameset: boolean = false;
  showProgressBar: boolean = false;
  page :number = 1;
  totalRec:number;
  record:number=2;
  URL: string = "http://localhost:3000/api/upload";
  myform: FormGroup;
  namedata = [];
  idvalue: number;
  gen: string;
  langknown: string;
  date: string;
  success: boolean = false;
  successupd: boolean = false;

  languages = {
    c1: "Java",
    c2: "Python",
    c3: "Angular Js",
    c4: "Node Js",
    c5: "Php",
    c6: "CSS"
  };

  constructor(
    private http: Http,
    public fb: FormBuilder,
    public commonservice: CommonService
  ) {
    this.myform = this.fb.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      roll_no: [null, Validators.compose([Validators.required])],
      filechoose: [null],
      gender: [null, Validators.compose([Validators.required])],
      date: [null, Validators.compose([Validators.required])],
      langknown: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.commonservice.getData().subscribe(data => {
      this.namedata = data.result;
      this.totalRec = this.namedata.length;
      console.log("NAMEDATA", this.namedata);
    });
  }

  //console.log("greet called", this.myform.controls.gender.value);

  // edit_data(row) {
  //   this.flag = true;
  //   this.myform.controls.name.setValue(this.namedata[row].name);
  //   this.myform.controls.roll_no.setValue(this.namedata[row].roll_no);
  //   this.myform.controls.gender.setValue(this.namedata[row].gender);
  //   this.myform.controls.langknown.setValue(this.namedata[row].langknown);
  //   this.myform.controls.date.setValue(this.namedata[row].dob);

  //   this.filename = this.namedata[row].picname;
  //   this.filenameset = true;
  //   this.idvalue = this.namedata[row].id;
  //   this.rowtoupdate = row;
    
  // }
recordPerPage(rpp1)
{
  console.log("rpp",rpp1.value);
this.record=parseInt(rpp1.value) ;
console.log(this.record)

}
  delete_data(row) {
    this.idvalue = this.namedata[row].id;
    this.commonservice
      .toServerDelete({
        id: this.idvalue
      })
      .subscribe(data => {
        console.log(row);
        console.log("aaray", this.namedata);
      
//delete this.namedata[row];
        //or 
         this.namedata.splice(row, 1);
      });
  }

  
}
