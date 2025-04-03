import { HttpHeaders } from '@angular/common/http';

export class Helpers {
  static getHttpHeaders(): HttpHeaders {
    var retorno = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      console.log(retorno);
      return retorno;
  }

  static getHttpHeadersSemToken(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  static toJson(model: any): any {
    var json = JSON.stringify(model, this.removeNullValues);
    console.log(json)
    return json;

  }

  private static removeNullValues(key: any, value: any) {
    if (value !== null) {
      return value;
    }
  }
}
