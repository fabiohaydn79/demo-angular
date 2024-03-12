import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserTableView, User, Picture, Name, Location } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TabulatorService } from '../../service/tabulator.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})

export class ListUserComponent implements OnInit, OnDestroy {

  public userTable;
  private subscriptions = new Subscription();  
  dataSource;
  dataRows;  

  constructor(
    private userService: UserService,
    private tabulatorService: TabulatorService
  ) { }

  ngOnInit(): void {    
    this.prepareTable();
    this.initListeners();
    this.clickGetDataFromEndpoint();        
  }

  prepareTable(){
    this.userTable = this.tabulatorService.tableConfig.USERS;    
    let option:any = {};
    option.table = this.userTable;
    option.action = 'getUserDetail';        
    option.label = 'Detalhes do Usuário';
    this.tabulatorService.setButtonBarOption.next(option); 

    option = {};
    option.table = this.userTable;    
    option.action = 'showMeSomething';
    option.label = 'Mostre o modal';
    this.tabulatorService.setButtonBarOption.next(option); 
  }
  
  initListeners(){
    this.registerOnUserTable();
  }
 
  registerOnUserTable(){
    this.subscriptions.add(
      this.userTable._response$.subscribe((response:any)=>{
        this.userTable.dataRows = response.dataRows;
        this.userTable.dataSource = new MatTableDataSource<UserTableView>(response.dataRows);                
      })
    );
  }

  clickGetDataFromEndpoint(){    
    this.userTable.page = 0;
    this.userTable.pageSize = 10;    
    this.userTable.get();
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
