export class IRootObject {
    isError?: boolean |string;
    message?: string;
}

export class ApiResponse<T> extends IRootObject{
  data: T;
}
