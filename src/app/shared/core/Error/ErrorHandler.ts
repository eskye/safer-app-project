import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorHandler {

  static handleError(error: HttpErrorResponse) {
    const errors: any = error.error;
    if (errors) {
      let modelStateError = '';
      for (const key in errors) {
        if (errors[key]) {
          modelStateError += errors[key] + '\n';
        }
      }
      if (modelStateError) {
        return throwError(modelStateError || 'Unexpected error occurred');
      }
    }

    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Server error');
  }


  static ErrorConnection(err: HttpErrorResponse) {
   const errorMessage = err.error instanceof Error ?
     `An error occurred: ${err.error.message}` :
     `Server returned code: ${err.status}, error message is: ${err.message}`;
   return throwError(errorMessage);
  }

  static ErrorServerConnection(error: HttpErrorResponse) {
   let errorText = '';
   if (!error.error) { return; }
   switch (error.status) {
     case 0:
      errorText = 'Unable to reach the server to process your request, check you are connected to the internet';
      break;
    case 400:
      errorText = typeof error.error.data !== 'string' ? error.error.data.map(err => err).join('\n') : error.error.data;
      break;
    case 401:
      errorText = 'You session has timed out';
      break;
    case 500:
      errorText = 'Unexpected error occurred while processing your request, try again later';
      break;
     default:
      errorText = 'Unexpected error occurred while processing your request, try again later';
      break;
   }
   return throwError(errorText);
  }


}
