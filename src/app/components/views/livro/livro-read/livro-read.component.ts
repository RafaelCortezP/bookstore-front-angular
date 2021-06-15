import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

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

}
