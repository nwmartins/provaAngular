import { Component, OnInit, ViewChild } from '@angular/core';
import { Veiculo } from './model/veiculo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { Cor } from './model/cor';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {
  public veiculo: Veiculo = new Veiculo();
  public cores: Array<Cor>;
  public cor: Cor = new Cor();
  public veiculos: Array<Veiculo>;
  public dataSource: any;
  public edicao: boolean;

  displayedColumns: string[] = ['actionsColumn', 'id', 'placa', 'renavam', 'chasi', 'marca','modelo', 'ano', 'cor' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    
    //this.veiculo = new Veiculo();
    this.edicao = false;
    this.cores = new Array<Cor>();
    this.veiculos = new Array<Veiculo>();
    //this.carregaDadosFake();
    this.atualizarCor();
    console.log(this.cores);

  }

  atualizarCor(){
    this.cor.id = 1;
    this.cor.descricao = 'Azul';
    this.cores.push(this.cor);

    this.cor = new Cor();
    this.cor.id = 2;
    this.cor.descricao = 'Amarelo';
    this.cores.push(this.cor);

    this.cor = new Cor();
    this.cor.id = 3;
    this.cor.descricao = 'Roxo';
    this.cores.push(this.cor);    
  }

  salvarVeiculo(){
    console.log("Veiculo Salva")
    console.log(this.veiculo);
    this.veiculos.push(this.veiculo);
    console.log("Lista de veiculo");
    console.log(this.veiculos);
    this.veiculo = new Veiculo(); //Instancia uma nova pessoa para não perder a referência da primeira0,

    this.dataSource = new MatTableDataSource<Veiculo>(this.veiculos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.Sort = this.sort;

  }

  atualizarPessoa(){
    console.log("Pessoa atualizada");
  }

  aplicarFiltro(valor : string){
    valor = valor.trim(); // Remove whitespace
    valor = valor.toLowerCase();

    console.log("realiza o filtro com "+valor);
    this.dataSource.filterPredicate = (data: Veiculo, filter: string ) => 
      data.id.toString().indexOf(filter) != -1 ||
      data.placa.toLowerCase().indexOf(filter) != -1 ||
      data.renavam.toString().indexOf(filter) != -1 ||
      data.chassi.toString().indexOf(filter) != -1 ||
      data.marca.toLowerCase().indexOf(filter) != -1 ||
      data.modelo.toLowerCase().indexOf(filter) != -1 ||
      data.ano.toString().indexOf(filter) != -1 ||
      data.cor.descricao.toLowerCase().indexOf(filter) != -1;
  
    this.dataSource.filter = valor;
  }

  ordenar(){
    this.dataSource.sort = this.sort;
  }

  excluir(id : number){
    this.veiculos.splice(this.veiculos.findIndex(d => d.id === id), 1);
    this.dataSource = new MatTableDataSource<Veiculo>(this.veiculos);
  }

  editar(id: number){  
    this.edicao = true;
    console.log("Editar ==> "+id);  
    let veiculoUpdate;
    this.veiculos.forEach(item => {
      if (item.id == id) {
        veiculoUpdate = item;
      }
    });
    this.veiculo = veiculoUpdate;
  }

  atualizar(){
    console.log('id' + this.veiculo.id);
    this.excluir(this.veiculo.id);
    this.veiculos.push(this.veiculo);
    this.veiculo = new Veiculo(); 
    this.edicao = false;
  }

  carregaDadosFake(){
    this.veiculo.id = 1;
    this.veiculo.placa = 'AAA-1234';
    this.veiculo.renavam = 27;
    this.veiculo.chassi = 658;
    this.veiculo.marca = 'Ford';
    this.veiculo.modelo = 'Ka'
    this.veiculo.ano = 1999;

    this.cor = new Cor();
    this.cor.id = 1;
    this.cor.descricao = 'Amarelo';

    this.veiculo.cor = this.cor;
    this.veiculos.push(this.veiculo);

    this.veiculo = new Veiculo();
    this.veiculo.id = 2;
    this.veiculo.placa = 'BBB-1234';
    this.veiculo.renavam = 9999;
    this.veiculo.chassi = 324;
    this.veiculo.marca = 'Nissan';
    this.veiculo.modelo = '350z'
    this.veiculo.ano = 2012;

    this.cor = new Cor();
    this.cor.id = 2;
    this.cor.descricao = 'Azul';

    this.veiculo.cor = this.cor;
    this.veiculos.push(this.veiculo);

    this.dataSource = new MatTableDataSource<Veiculo>(this.veiculos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.Sort = this.sort;    

  }  
}
