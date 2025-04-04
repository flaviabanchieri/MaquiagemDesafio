import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatMenuModule, RouterModule, CommonModule],
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  estaAutenticado(){
    return this.authService.isAuthenticated()
  }

  navegar(route: string){
    this.router.navigate([route])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home'])
  }
}
