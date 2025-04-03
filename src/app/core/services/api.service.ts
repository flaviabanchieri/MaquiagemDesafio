import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Helpers } from '../../helpers/helpers';
import { TagsDictionary } from '../models/tags';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = 'https://localhost:44370/api/';

  constructor(private http: HttpClient) {}

  getMarcas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}produtos/marcas`);
  }

  getCategorias(): Observable<TagsDictionary> {
    return this.http.get<TagsDictionary>(`${this.apiUrl}produtos/categorias`).pipe(
      catchError((error) => {
        return of({});
      })
    );
  }

  getTags(): Observable<TagsDictionary> {
    return this.http.get<TagsDictionary>(`${this.apiUrl}produtos/tags`).pipe(
      catchError((error) => {
        return of({});
      })
    );
  }

  getItems<T>(caminho: string): Observable<T> {
    return this.http.get<T>(this.apiUrl + `${caminho}`, {
      headers: Helpers.getHttpHeadersSemToken(),
    });
  }

  getFiltro<T>(caminho: string, filtro: any): Observable<T> {
    var filtros = this.prepararParametros(filtro);
    console.log(filtros);
    return this.http.get<T>(this.apiUrl + `${caminho}` + filtros, {
      headers: Helpers.getHttpHeadersSemToken(),
    });
  }

  postItems(caminho : string, objeto: any) {
    console.log('entrou aqui')
    return this.http
      .post(this.apiUrl + `${caminho}`, Helpers.toJson(objeto), {
        headers: Helpers.getHttpHeaders(),
      })
      .pipe(map((res) => res));
  }

  postItemsSemToken(caminho : string, objeto: any) {
    return this.http
      .post(this.apiUrl + `${caminho}`, Helpers.toJson(objeto), {
        headers: Helpers.getHttpHeadersSemToken(),
      })
      .pipe(map((res) => res));
  }

  private prepararParametros(filtro: any): string {
    if (!filtro) return '';

    const paramsList = Object.keys(filtro)
      .filter((param) => filtro[param] != null)
      .map((param) => this.formatarParametro(param, filtro[param]))
      .filter((param) => param !== '')
      .join('&');

    return paramsList ? `?${paramsList}` : '';
  }

  private formatarParametro(nome: string, valor: any): string {
    if (valor == null) return '';

    if (Array.isArray(valor)) {
      if (valor.length === 0) return '';
      return `${nome}=${valor.map((v) => encodeURIComponent(v)).join(',')}`;
    }

    if (typeof valor === 'boolean' || typeof valor === 'number') {
      return `${nome}=${encodeURIComponent(valor.toString())}`;
    }

    return `${nome}=${encodeURIComponent(valor)}`;
  }
}
