import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
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
        let errorMessage: string;
        if (error.error) {
          errorMessage = `${error.error.message}!`;
        } else {
          errorMessage = `${error.message}!`;
        }

        this.toastr.error(errorMessage, 'Error');

        throw new Error(errorMessage);
      })
    );
  }
}
