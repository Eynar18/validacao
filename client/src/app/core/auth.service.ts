import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "./model/account";
import {jwtDecode} from "jwt-decode";

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

  setUserName(name: string): void {
    localStorage.setItem('username', name);
  }

  getUserName(): string | null{
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return false;
    }

    return decodedToken.exp > Date.now() / 1000;
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
