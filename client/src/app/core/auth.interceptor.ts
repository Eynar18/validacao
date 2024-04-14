import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorSnackBarComponent} from "../shared/components/error-snack-bar/error-snack-bar.component";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return this.handleRequest(next, request);
  }

  protected handleRequest(next: HttpHandler, request: HttpRequest<any>) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        let errorMessage: string;
        if (error.error) {
          errorMessage = `${error.error.message}!`;
        } else {
          errorMessage = `${error.message}!`;
        }

        this.snackBar.open(errorMessage,'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-style']
        });

        throw new Error(errorMessage);
      })
    );
  }
}
