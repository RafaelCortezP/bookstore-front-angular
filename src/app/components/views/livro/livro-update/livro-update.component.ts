import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  idCat : String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  titulo = new FormControl('', Validators.minLength(3))
  nome_autor = new FormControl('', Validators.minLength(3))
  texto = new FormControl('', Validators.minLength(10))

  constructor(private service: LivroService, private router: Router, private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.idCat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }
  
  findById(): void {
    this.service.findById(this.livro.id!).subscribe(response => {
      this.livro = response
    })
  }

  update(): void {
    this.service.update(this.livro).subscribe(response => {
      this.router.navigate([`categorias/${this.idCat}/livros`])
      this.service.message('Livro atualizado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.idCat}/livros`])
      this.service.message('Falha ao atualizar Livro!')
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.idCat}/livros`])
  }

  getMessageTitulo() {
    if( this.titulo.invalid ) {
      return 'O campo TITULO deve conter entre 3 e 100 caracteres.';
    }
    return false;
  }
 
  getMessageNomeAutor() {
    if( this.nome_autor.invalid ) {
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres.';
    }
    return false;
  }
 
  getMessageText() {
    if( this.texto.invalid ) {
      return 'O campo TEXTO deve conter entre 10 e 2.000.000 caracteres.';
    }
    return false
  }

}
