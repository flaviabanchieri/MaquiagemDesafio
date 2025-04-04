import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../auth/auth.service";
import { Router, RouterLink, RouterModule } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  senhaVazia = false;
  usuarioVazio = false;
  senhaIncorreta: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.loginForm.valid) {
      const username = this.loginForm.get('user')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(username, password).subscribe(response => {
        console.log(`Status: ${response.status}, Mensagem: ${response.mensagem}`);

        if (response.status === 200) {
          this.senhaIncorreta = false;
          this.router.navigate(['/home']);
        } else {
          this.senhaIncorreta = true;
        }
      });
    } else {
      this.senhaIncorreta = true;
    }
  }

}
