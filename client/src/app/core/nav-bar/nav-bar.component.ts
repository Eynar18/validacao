import {Component, HostBinding, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  animations: [
    trigger('hoverEffect', [
      state('default', style({
        transform: 'scale(1)'
      })),
      state('hover', style({
        transform: 'scale(1.06)'
      })),
      transition('default <=> hover', animate('300ms ease'))
    ])
  ]
})
export class NavBarComponent implements OnInit {
  username: string | null = '';
  @HostBinding('@hoverEffect') hover = 'default';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUserName();
  }

  onMouseEnter() {
    this.hover = 'hover';
  }

  onMouseLeave() {
    this.hover = 'default';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}
