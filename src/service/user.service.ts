import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { User } from '../model/user.model';
import { TabulatorService } from '../service/tabulator.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userTable: any;

  constructor(
    private http: HttpClient,
    private tabulatorService: TabulatorService
  ) { 
    this.userTable = this.tabulatorService.tableConfig.USERS;
    this.userTable.get = (this.getData).bind(this);
  }

  public getData(): any{
    this.http.get('https://randomuser.me/api/?nat=br&results=50')
    // this.getMockedResponse()
    .subscribe((response: any) => {               
      let userList = (response.body && response.body.results) ? response.body.results : response.results;
      let mapped = this.mapper(userList);
      this.userTable._request.next(mapped);
    });
  }

  mapper(userList){    
    let user;
    let dataRows: User[] = [];
    let i = 0;
    userList.forEach(userItem => {
      user = {} as User;
      user.id = i;
      user.email = userItem.email;
      user.phone = userItem.phone;
      user.cell = userItem.cell;
      user.birthdate = moment(userItem.dob.date).format('DD/MM/YYYY');
      user.name = userItem.name;
      user.fullname = user.name.first + ' ' + user.name.last;
      user.picture = userItem.picture;      
      user.location = userItem.location
      dataRows.push(user);
      i++;
    });
    return {dataRows};
  }


     ///////////////
    //  M O C K  //
  ////////////////


  setHttpResponse(data){
    let _response = new HttpResponse({
      status:200,
      body: data
    });
    return of(_response);
  }

  setHttpErrorResponse(code, msg){
    let _response = new HttpErrorResponse({
      status: code,
      statusText: msg
    });
    return of(_response);
  } 

  getMockedResponse(){    
    let json = {
      "results":[
        {
            "gender":"female",
            "name":{
              "title":"Mrs",
              "first":"Aldalgisa",
              "last":"Sales"
            },
            "location":{
              "street":{
                  "number":6502,
                  "name":"Avenida Brasil "
              },
              "city":"São Carlos",
              "state":"São Paulo",
              "country":"Brazil",
              "postcode":83706,
              "coordinates":{
                  "latitude":"-62.1387",
                  "longitude":"162.8972"
              },
              "timezone":{
                  "offset":"+6:00",
                  "description":"Almaty, Dhaka, Colombo"
              }
            },
            "email":"aldalgisa.sales@example.com",
            "login":{
              "uuid":"0e7ca0df-d9f9-4af1-bdbe-131e72952823",
              "username":"whitebird300",
              "password":"racerx",
              "salt":"J9LP0fB1",
              "md5":"3ea907fb62f45c93dc01b8703fbf95f1",
              "sha1":"98813748a5840d1bf18db5961d0af0bd86ef520d",
              "sha256":"f93f0ca072d6c640d7b29929e2f788ddadba5969f4e16b5edac8f1c0e602de07"
            },
            "dob":{
              "date":"1949-11-07T17:48:26.537Z",
              "age":71
            },
            "registered":{
              "date":"2017-09-02T14:08:32.801Z",
              "age":3
            },
            "phone":"(15) 3151-2590",
            "cell":"(54) 2748-6260",
            "id":{
              "name":"",
              "value":null
            },
            "picture":{
              "large":"https://randomuser.me/api/portraits/women/46.jpg",
              "medium":"https://randomuser.me/api/portraits/med/women/46.jpg",
              "thumbnail":"https://randomuser.me/api/portraits/thumb/women/46.jpg"
            },
            "nat":"BR"
        }
      ],
      'dataColumns': ['name', 'email', 'id']
    };
    return this.setHttpResponse(json);
  }
}