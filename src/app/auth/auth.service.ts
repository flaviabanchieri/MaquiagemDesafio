import { Usuario } from './../core/models/usuario';
import { ApiService } from './../core/services/api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth = false;
  private readonly apiUrl = 'https://localhost:44370/api/usuarios';

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {}

  login(email: string, senha: string): Observable<{ status: number; mensagem: string }> {
    const usuario = { id: 0, nome: '', email, senha };

    return this.apiService.postItemsSemToken('usuarios/login', usuario).pipe(
      map((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
        }
        return { status: 200, mensagem: 'Login bem-sucedido' };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição:', error);
        return of({ status: error.status, mensagem: error.error?.mensagem || 'Erro desconhecido' });
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
