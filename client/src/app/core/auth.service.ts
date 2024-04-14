import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "./model/account";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/account'

  constructor(private http: HttpClient) {}

  authenticate(account: Account): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, account);
  }

  register(account: Account): Observable<any> {
    return this.http.post(this.baseUrl, account);
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
