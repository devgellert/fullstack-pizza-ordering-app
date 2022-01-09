import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title = 'Admin panel';

  constructor(public authService: AuthService, private router: Router) { }
  ngOnInit(){};
  logout(){
    this.authService.logout();
    this.router.navigate(['/','login'])
  }

}
