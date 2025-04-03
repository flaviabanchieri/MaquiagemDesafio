import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../auth/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  senhaVazia = false;
  usuarioVazio = false;
  senhaIncorreta: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.loginForm.valid) {
      const username = this.loginForm.get('user')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log(username, password)
      if (this.authService.login(username, password)) {
      } else {
        this.senhaIncorreta = true;
      }
    } else {
      this.senhaIncorreta = true;
    }
  }

}
