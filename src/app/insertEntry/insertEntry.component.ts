
import { Component, OnInit } from "@angular/core";
import { FormGroup,FormBuilder,Validators} from "@angular/forms";
import { CommonService } from "../common.service";
import { Http } from "@angular/http";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-page",
  templateUrl: "./insertEntry.component.html",
  styleUrls:['./insertEntry.component.css']
})

export class insertEntryComponent implements OnInit{
  filename: string;
  flag: boolean = false;
  filenameset: boolean = false;
  showProgressBar: boolean =false;

  URL: string = "http://localhost:3000/api/upload";
  myform: FormGroup;
  uploadsuc: boolean;
  chkfiltyp = true;
  namedata = [];
  idvalue: string;
  name11: string;
  gen: string;
  langknown: string;
  date: string;
  success: boolean= false;
  successupd: boolean= false;
orgfilename:string;
  editdata :any;

  constructor(
    private http: Http,
    public fb: FormBuilder,
    public commonservice: CommonService,
    public route:ActivatedRoute
  ) {
    this.myform = this.fb.group({
        'name': [ "", Validators.compose([Validators.required, Validators.minLength(5)])],
        'roll_no': [null, Validators.compose([Validators.required])],
        'filechoose': [null],
         'gender': [null, Validators.compose([Validators.required])],
        'date': [null, Validators.compose([Validators.required])],
        'langknown':[null, Validators.compose([Validators.required])]
      });
  }
  ngOnInit()
  {
     console.log('h1');
      this.route.paramMap.subscribe((param)=>{
        console.log(param);
        if(param.getAll('object')[0]!=undefined){

        this.idvalue=param.getAll('object')[0];
        var id = param.getAll('object')[0];

        
        this.commonservice.getEditData({id:id}).subscribe(data => {
          this.editdata=data.data[0];
         this.myform.get('date').setValue(this.editdata.dob);
          this.myform.get('name').setValue(this.editdata.name);
         this.myform.get('roll_no').setValue(this.editdata.roll_no);
         this.myform.get('gender').setValue(this.editdata.gender);
         this.myform.get('langknown').setValue(this.editdata.langknown);
         this.filename=this.editdata.picname;
         console.log("hiiiiiiiii",this.filename);
        this.flag=true;
        this.filenameset=true;})
      }
    });
  }

langknownSelected(event) {
    this.langknown = event.value;
    console.log("mbnjsjbf", event.value);
  }

  greet(abc) {
    console.log("abc.value",abc.value)
    if (abc.value == "male") {
      this.name11 = "Mr." + this.myform.controls.name.value;
    } else if (abc.value == "female") {
      this.name11 = "Mrs." + this.myform.controls.name.value;
    } else {
      this.name11 = abc.value;
      
    }
    this.gen = abc.value;

    //console.log("greet called", this.myform.controls.gender.value);
  }

  fileobj: any;

  FileSelected(event) {
if(this.fileobj==undefined){


  console.log(event);
  this.fileobj = event.target.files[0];
  console.log("what?", this.fileobj);
  if (this.fileobj != undefined) {
    if (this.fileobj.type == "image/jpeg") {
      console.log("byee",this.fileobj.name)
      this.orgfilename = this.fileobj.name;
      this.chkfiltyp = true;
      this.showProgressBar=true ;

      this.Uploadpic();
    } 
    else {
      this.chkfiltyp = false;
    }
  }
}
else{
  this.filename=undefined;
  this.fileobj=undefined;
}
   
    // else if(this.fileobj ==undefined){
    // //   this.filename=null;
    // }
    //console.log("hiiiiii",this.fileobj.name);
    // this.filenameee = this.fileobj.name;
  }
  showdate(event) {
    console.log("datechAABAGE");
    this.date = event.value;
  }

  Uploadpic() {
    if (this.chkfiltyp) {
      const fd = new FormData();
      console.log("anotger",fd);
      fd.append("image", this.fileobj, this.orgfilename);
      console.log("fd", fd.getAll("image"));

      this.http.post(this.URL, fd).subscribe(data => {
        console.log("fafafaf", data.json());
        this.filename = data.json().filename;
        console.log("filename",this.filename);
        this.uploadsuc = data.json().success;
        if (this.uploadsuc) {
          this.filenameset = true;
          // alert("uploaded successfully"); 
          this.showProgressBar= false;
        } else {
          alert("not uploaded");
        }
      });
    } else {

      alert("no file chosen or wrong file type! :only jpeg allowed");
    }
    console.log("chkkk",this.filename)
  }

clear(){
  this.myform.reset();
  this.filename=null;
  this.name11=null;
  this.success=false;
  this.successupd=false;
  this.flag=false;

}

  updateData(row) {
    console.log("GTGTGG",this.myform);
    // if (this.fileobj != undefined)
    if (this.myform.valid && this.filenameset) {
      this.commonservice
        .toServerUpd({
          name: this.myform.controls.name.value,
          roll_no: this.myform.controls.roll_no.value,
          gender: this.myform.controls.gender.value,
          langknown: this.myform.controls.langknown.value,
          date: this.myform.controls.date.value,

          filename: this.filename,
          id: this.idvalue
        })
        .subscribe(data => {
          console.log(row);
          console.log(data);
          if (data.success) {
            this.successupd=true;
            
            
            this.myform.reset();
            this.filename=null;
            this.name11=null;
            this.flag=false;
          }
        });
    } else {
      console.log("valid or not", this.filenameset);
      alert("please fill all details!");
    }
  }

  sendData() {  
    
    console.log("checkkkkkkkkkkkkkk",this.myform)
    if (this.myform.valid && this.filenameset && this.fileobj != undefined) {
      console.log("hello",this.myform);
      this.commonservice
        .toServer({
          name: this.myform.controls.name.value,
          rollno: Number(this.myform.controls.roll_no.value),
          gender: this.myform.controls.gender.value,
          langknown: this.myform.controls.langknown.value,
          date: this.myform.controls.date.value,
          filename: this.filename
        })
        .subscribe(data => {
          console.log(data);

          if (data.success) {
            this.success=true;
            this.namedata.push({
              name: this.myform.controls.name.value,
              roll_no: this.myform.controls.roll_no.value,
              gender: this.myform.controls.gender.value,
              langknown: this.myform.controls.langknown.value,
              dob: this.myform.controls.date.value,
              picname: this.filename
            });

            this.myform.reset();
            this.filename=null;
            this.name11=null;
          }
        });
    } else {
      console.log("valid or not", this.myform.valid);
      alert("please fill all of the details!");
    }
  }
}