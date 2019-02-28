import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarOpen = false;

  constructor(private userService: UserService,private router : Router) { }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isLoggedIn() {
    if(this.userService.isLoggedIn()){
      return true;
    }else{
      return false;
    }
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  onLogin(){
    this.router.navigate(['/login']);
  }
}
