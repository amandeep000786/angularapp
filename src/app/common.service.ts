import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable()
export class CommonService {
  constructor(private http: Http) {}

  // toServer(data) {
  //   var headers = new Headers();
  //   console.log(data);
  //   headers.append("Content-Type", "application/json");
  //   return this.http
  //     .post("http://localhost:3000/api/upload", data, { headers: headers })
  //     .pipe(map(res => res.json()));
  // }
  private postUpdated = new Subject();
    object_data: any;
  getData() {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
      .get("http://localhost:3000/api/page/get", { headers: headers })
      .pipe(map(res => res.json()));
  }

  getEditData(object) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
      .post("http://localhost:3000/api/edit", object,{ headers: headers })
      .pipe(map(res => res.json()));
  }
  toServerDelete(data) {
    console.log(data);
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
      .post("http://localhost:3000/api/delete", data, { headers: headers })
      .pipe(map(res => res.json()));
  }

  toServerUpd(data) {
    console.log(data);
    return this.http
      .post("http://localhost:3000/api/update", data)
      .pipe(map(res => res.json()));
  }

  

  toServer(fd) {
    console.log(fd);
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
      .post("http://localhost:3000/api/page", fd, { headers: headers })
      .pipe(map(res => res.json()));
  }
}
