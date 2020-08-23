import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EmitService {

  data: any;
  isactive: boolean;
  isOpen: boolean;
  barcode: boolean;
  statelocals: any;
  totalCountChild: number;
  pageHeader: any;
  // Observable variable

  private messageSource = new BehaviorSubject<boolean>(this.isactive);
  currentMessage$ = this.messageSource.asObservable();


  private sidebarOpenSource = new BehaviorSubject<boolean>(this.isOpen);
  currentSideBarState$ = this.sidebarOpenSource.asObservable();

  private dataBarcodeSource = new BehaviorSubject<boolean>(this.barcode);
  currentCheck$ = this.dataBarcodeSource.asObservable();

  private stateSource = new BehaviorSubject<any>(this.statelocals);
  stateData$ = this.stateSource.asObservable();

  // Page Header Message Hub
  private headerHub = new BehaviorSubject<any>(this.pageHeader);
  headerHubData$ = this.headerHub.asObservable();

  private DataCountSource = new BehaviorSubject<number>(this.totalCountChild);
  countSource$ = this.DataCountSource.asObservable();

  constructor() { }

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }
  checkTotalCount(total: number) {
    this.DataCountSource.next(total);
  }
  getPageHeaderMessage(title: any) {
    this.headerHub.next(title);
  }

  changeSideBarState(message: boolean) {
    this.sidebarOpenSource.next(message);
  }

  checkBarcodeStatus(message: boolean) {
    this.dataBarcodeSource.next(message);
  }

  changeLocalState(state: any) {
    this.stateSource.next(state);
  }

}
