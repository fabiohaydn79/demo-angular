import { Injectable } from '@angular/core';
import { TableConfigItem } from '../model/table-config';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabulatorService {
  public setButtonBarOption = new Subject<any>();
  buttonBarOption$ = this.setButtonBarOption.asObservable();
  
  public tableConfig = {
    USERS: new TableConfigItem('USERS')
  }
  
  constructor() {
    this.setHeadersColumns();
    this.initListeners();
  }

  initListeners(){
    this.registerOnButtonBarOption();
  }

  setHeadersColumns(){    
    this.tableConfig.USERS.dataHeaders = ['Nome', 'E-mail', 'Detalhes'];
    this.tableConfig.USERS.dataColumns = ['fullname', 'email', 'id'];    
  }

  setAction(table, action){
    table.actions[action] = (parm) => {
      if(table.name==='USERS' && action==='getUserDetail'){
        return table.dataRows.find(user => user.id===parm.id);
      }
      if(table.name==='USERS' && action==='showMeSomething'){
        return {msg: 'Alguma coisa!'};
      }
    };
  }

  registerOnButtonBarOption(){
    this.buttonBarOption$.subscribe((option:any) => {
      option.table.actionNameList.push({ action: option.action, label: option.label });
      this.setAction(option.table, option.action);
    });
  }
}
