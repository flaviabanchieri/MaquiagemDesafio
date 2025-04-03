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
      console.log(username, password)
      this.authService.login(username, password).subscribe(response => {
        console.log(`Status: ${response.status}, Mensagem: ${response.mensagem}`);

        if (response.status === 200) {
          this.senhaIncorreta = false;
        } else {
          this.senhaIncorreta = true;
        }
      });
    } else {
      this.senhaIncorreta = true;
    }
  }

}
