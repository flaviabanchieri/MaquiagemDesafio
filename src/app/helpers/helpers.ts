import { HttpHeaders } from '@angular/common/http';

export class Helpers {
  static getHttpHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
  }

  static getHttpHeadersSemToken(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  static toJson(model: any): any {
    return JSON.stringify(model, this.removeNullValues);
  }

  private static removeNullValues(key: any, value: any) {
    if (value !== null) {
      return value;
    }
  }
}
