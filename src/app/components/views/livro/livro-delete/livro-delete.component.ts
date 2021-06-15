import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  idCat : String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

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

  delete(): void {
    this.service.delete(this.livro.id!).subscribe(response => {
      this.router.navigate([`categorias/${this.idCat}/livros`])
      this.service.message('Livro deletado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.idCat}/livros`])
      this.service.message('Falha ao deletar Livro!')
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.idCat}/livros`])
  }

}
