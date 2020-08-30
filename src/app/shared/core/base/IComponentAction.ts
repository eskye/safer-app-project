import { IQueryOptions, IFilter } from '@app-shared/core/interface/IQueryOptions';
import { IError } from '@app-shared/core/model/IError';
import { IAlert } from '@app/shared/core/model/IAlert';
import { INameAndId } from '@app/shared/core/model/IGroup';


export interface IComponentAction {
    url: any;
    query: IQueryOptions;
    items: any;
    states: any;
    statuses: any;
    nameAndIds: INameAndId[];
    pager: any;
    item: any;
    size: number;
    sizes: Array<number>;
    genders: Array<string>;
    months: Array<string>;
    hideFilter: boolean;
    filter: any;
    error: IError;
    alert: IAlert;
    filterarray: IFilter[];
    notificationData: Array<any>;
    isUploading: boolean;
    paginationConfig?: { count: number; page: number; total: number };
    selectedIds: any;
    selectedAll: any;
    getParamValue: (key: string) => string;
    pageChanged: (event) => void;
    changePage: () => void;
    go(route, id);
    goToNav(route);
    reloadComponent();
    setupPagination();
    genPagination();
    getNameAndId(url);
    getPageInfoDescription(): string;
    toggleFilter();
    formatQueryString(): string;
    getLoaderInstance(): Promise<HTMLIonLoadingElement>;
    hideLoader();
    showLoader(message?: string, customclass?: string);
    getToastInstance(): Promise<HTMLIonToastElement>;
    hideToast();
    showToast(message?: string, customclass?: string);
}
