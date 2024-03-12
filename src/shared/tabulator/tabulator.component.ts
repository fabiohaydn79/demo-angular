import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TabulatorService } from '../../service/tabulator.service';
import { MatPaginator } from '@angular/material/paginator';
import { ModalComponent } from '../../../src/app/modal/modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'tabulator',
  templateUrl: './tabulator.component.html',
  styleUrls: ['./tabulator.component.scss']
})
export class TabulatorComponent implements OnInit {

  @Input() tableName: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public table;
  dialogRef;
  
  constructor(
    public dialog: MatDialog,
    private tabulatorService: TabulatorService
  ) { }

  ngOnInit(): void {
    this.table = this.tabulatorService.tableConfig[this.tableName];    
    this.initListeners();
  }

  initListeners(){
    this.registerOnTable();
  }

  registerOnTable(){
    this.table._response$.subscribe(() => {
      this.table.dataSource.paginator = this.paginator;
    });
  }

  clickOption(action, parm){    
    let detail = this.table.actions[action](parm);
    detail.action = action;    
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '640px',
      data: {detail}
    });
  }

  clickCloseModal(){
    this.dialogRef.close();
  }
}
