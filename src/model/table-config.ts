import { Observable, of, Subject } from 'rxjs';

export class TableConfigItem {
    public dataColumns:any[] = [];
    public dataHeaders:any[] = [];    
    public dataRows;
    public dataSource;
    public actions:any = {};
    public actionNameList:any[] = [];
    public get;    
    public displayedColumns: any;    
    public _empty: Subject<any> = new Subject<any>();
    public _empty$: Observable<any>;        
    public _request: Subject<any> = new Subject<any>();    
    public _response$: Observable<any>;
    
    constructor(        
        public name: string        
    ) {        
        this._response$ = this._request.asObservable();
        this._empty$ = this._empty.asObservable();                
    }
}