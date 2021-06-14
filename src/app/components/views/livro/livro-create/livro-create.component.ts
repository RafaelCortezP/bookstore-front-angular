import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

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
  }

  create(): void {
    this.service.create(this.livro, this.idCat).subscribe(response => {
      this.router.navigate([`categorias/${this.idCat}/livros`])
      this.service.message('Livro criado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.idCat}/livros`])
      this.service.message('Erro ao criar novo Livro!')
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
