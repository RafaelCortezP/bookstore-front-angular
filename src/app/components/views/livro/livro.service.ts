import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategoria(idCat: String): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${idCat}`
    return this.http.get<Livro[]>(url)
  }

  findById(id: String): Observable<Livro>{
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.get<Livro>(url)
  }

  update(livro: Livro): Observable<Livro>{
    const url = `${this.baseUrl}/livros/${livro.id}`
    return this.http.put<Livro>(url, livro)
  }

  delete(id: String): Observable<void>{
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.delete<void>(url)
  }

  create(livro: Livro, idCat: String): Observable<Livro> {
    const url = `${this.baseUrl}/livros?categoria=${idCat}`
    return this.http.post<Livro>(url, livro)
  }

  message(str: string): void{
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
