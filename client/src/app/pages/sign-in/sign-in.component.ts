import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  ngOnInit(): void {

    this.buildLoginForm()
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  checkIfAuthenticated() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/task']);
    }
  }

  buildLoginForm() {
    this.loginForm = this.fb.group({
      id: [null],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.value).subscribe((response) => {
        if (response.token) {
          this.authService.storeToken(response.token);
        }
      });
    }
  }

  signUp(): void {
    this.router.navigate(['/sign-up']);
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
