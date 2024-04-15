import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth.service";
import {Account} from "../../core/model/account";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: new FormControl('', {validators: [Validators.required], nonNullable: true}),
      password: new FormControl('', {validators: [Validators.required], nonNullable: true}),
      confirmPassword: new FormControl('', {validators: [Validators.required], nonNullable: true})
    }, {validators: this.passwordMatchValidator});
  }

  signUp() {
    if (this.signUpForm.valid) {
      const account: Account = {
        username: this.signUpForm.get('username')?.value,
        password: this.signUpForm.get('password')?.value
      }

      this.authService.register(account)
        .subscribe({
          next: (response) => {
            this.toastr.success(response.message);
            this.router.navigate(['/sign-in']);
          }
        });
    }
  }

  passwordMatchValidator(frm: FormGroup) {
    const password = frm.get('password')!.value;
    const confirmPassword = frm.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
