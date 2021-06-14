import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];

  idCat: String = ''

  livros: Livro[] = []

  constructor(private service: LivroService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idCat = this.route.snapshot.paramMap.get('id_cat')!
    this.findAllByCategoria()
  }

  findAllByCategoria(): void {
    this.service.findAllByCategoria(this.idCat).subscribe(response => {
      this.livros = response
      console.log(this.livros)
    })
  }

}
