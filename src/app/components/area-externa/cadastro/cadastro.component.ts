import { Usuario } from './../../../core/models/usuario';
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../auth/auth.service";
import { Router } from "@angular/router";
import { ApiService } from "../../../core/services/api.service";
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CadastroComponent implements OnInit {
  loginForm: FormGroup;
  senhaVazia = false;
  usuarioVazio = false;
  senhaIncorreta: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private apiService: ApiService) {
    this.loginForm = this.fb.group({
      nome: ['', [Validators.required]],
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      const nome = this.loginForm.get('nome')?.value;
      const username = this.loginForm.get('user')?.value;
      const password = this.loginForm.get('password')?.value;

      var usuario: Usuario = new Usuario();
      usuario.email = username;
      usuario.senha = password

      this.apiService.postItemsSemToken('usuarios/cadastro', usuario).pipe(
        map((response: any) => {
          this.router.navigate(['/login'])
        })).subscribe();

    }
  }

}
