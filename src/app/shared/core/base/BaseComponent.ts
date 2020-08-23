import { Location } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  ParamMap,
} from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Title } from '@angular/platform-browser';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators';

import { IComponentAction } from '@app-shared/core/base/IComponentAction';
import { IError } from '@app-shared/core/model/IError';
import { IQueryOptions, IFilter } from '@app-shared/core/interface/IQueryOptions';
import { IRootService } from '@app-shared/core/interface/IRootService';
import { IAlert } from '@app/shared/core/model/IAlert';
import { INameAndId } from '@app/shared/core/model/ILevel';
import { ApiResponse } from '@app/shared/core/interface/IRootObject';
import { Observable } from 'rxjs';
import { LoadingController, ToastController} from '@ionic/angular';




export abstract class BaseComponent implements IComponentAction, OnInit {
  private locker = '123_text_ec';
  selectedIds: any;
  selectedAll: any;
  checkedList: any[];
  masterSelected: any;
  constructor(
    public toasterCtrl?: ToastController,
    public router?: Router,
    public activatedRoute?: ActivatedRoute,
    public loaderCtrl?: LoadingController,
    public resource?: IRootService<any>
  ) { }

  query: IQueryOptions;
  filterarray: IFilter[];
  waiting: boolean;
  url: any;
  items: any;
  item: any = {};
  exitem: any;
  alert: IAlert;
  notificationData: Array<any> = [];

  states: any;
  statuses: any;
  nameAndIds: INameAndId[];
  isUploading: boolean;
  error: IError = {
    Message: 'Error: No internet connection',
    isError: false,
  };

  hideFilter = false;
  size = 10;
  filter: any = {};
  changePage: () => void;
  paginationConfig = {
    count: this.size || 50,
    page: 1,
    total: 0,
  };
  sizes: Array<number> = [10, 20, 50, 100, 150, 200, 250];

  genders: Array<string> = ['Man', 'Woman'];

  months: Array<string> = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  checkItems: any;
  pager: any = { page: 1, size: 10 };
  loadInstance: HTMLIonLoadingElement;
  toastInstance: HTMLIonToastElement;
  getParamValue(key: string): string {
    let value = '';
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      value = param.get(key);
    });
    return value;
  }
  go(route, id) {
    this.router.navigate([route, id]);
  }
  goToNav(route) {
    this.router.navigate([route]);
  }
  ngOnInit() { }
  reloadComponent() {
    this.filter = {};
    this.size = 10;
    this.ngOnInit();
  }

  async showLoader(message?: string, customclass?: string){
    this.loadInstance =  await this.loaderCtrl.create({
      cssClass: customclass,
      message: message || 'Please wait...',
    });
    await this.loadInstance.present();
  }

  async hideLoader(){
    await this.loadInstance.dismiss();
  }

  async getLoaderInstance(): Promise<HTMLIonLoadingElement>{
    return this.loadInstance;
  }

  async showToast(message?: string, color?: string){
    this.toastInstance =  await this.toasterCtrl.create({
      message,
      position: 'bottom',
      duration: 2000,
      color
    });
    await this.toastInstance.present();
  }
  async hideToast(){
    await this.toastInstance.dismiss();
  }
  async getToastInstance(): Promise<HTMLIonToastElement>{
    return this.toastInstance;
  }

  setupPagination() {
    this.waiting = true;
    return this.resource
      .query(
        Object.assign({
          count: this.paginationConfig.count,
          page: this.paginationConfig.page,
          orderByExpression: this.query.orderByExpression,
          whereCondition: JSON.stringify(this.filter),
        }),
        this.url
      )
      .subscribe(
        (res) => {
          this.waiting = false;
          this.paginationConfig.total = res.total;
          // this.resource.getService(EmitService).checkTotalCount(this.paginationConfig.total);
          this.items = res.data.items;
          this.hideFilter = false;
        },
        (error) => {
          this.waiting = false;
          this.resource.errorAlert(
            'An error occurred while loading resource',
            'Error'
          );
        }
      );
  }

  genPagination() {
    return this.resource
      .query(
        Object.assign({
          size: this.paginationConfig.count,
          page: this.paginationConfig.page,
          orderByExpression: this.query.orderByExpression,
          whereCondition: this.query.whereCondition,
        }),
        this.url
      )
      .pipe(
        map((res) => {
          this.paginationConfig.total = res.data.total;
          return res;
        })
      );
  }

  getPageInfoDescription(): string {
    if (this.items) {
      return (
        'Showing ' +
        (this.paginationConfig.count * (this.pager.page - 1) + 1) +
        ' to ' +
        (this.paginationConfig.count * (this.pager.page - 1) +
          this.items.length) +
        ' of ' +
        this.paginationConfig.total + ' records '
      );
    }
    return '';
  }

  pageChanged(event) {
    this.masterSelected = false;
    this.paginationConfig.page = event;
    this.waiting = true;
    return this.resource
      .query(
        Object.assign({
          size: this.paginationConfig.count,
          page: this.paginationConfig.page,
          orderByExpression: this.query.orderByExpression,
          whereCondition: this.formatQueryString(),
        }),
        this.url
      )
      .subscribe(
        (res) => {
          this.items = res.data.data;
          this.pager.page = this.paginationConfig.page;
          // this.paginationConfig.total = data.total;
          this.waiting = false;
        },
        (error) => {
          this.error.isError = true;
          this.error.Message = error.error.message;
          this.resource.errorAlert(error.error.message, 'Error');
          this.waiting = false;
        }
      );
  }

  toggleFilter() {
    this.hideFilter = !this.hideFilter;
  }

  getNameAndId(url): Observable<ApiResponse<INameAndId>> {
    return this.resource.getlist(url);
  }

  formatQueryString(): string {
    let query = '';
    if (this.filter) {
      for (const key of Object.keys(this.filter)) {
        const value = this.filter[key];
        if (value){ query += `&${key}=${value}`; }
      }
    }
    return query;
  }



}
