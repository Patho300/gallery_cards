import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from 'src/app/services/cards.service';
import { AuthService } from '../../services/auth.service';
import { cards } from 'src/app/models/cards.model';
import { CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-gallery-test',
  templateUrl: './gallery-test.component.html',
  styleUrls: ['./gallery-test.component.css']
})

export class GalleryTestComponent implements OnInit {

@ViewChild( CdkVirtualScrollViewport ) viewport: CdkVirtualScrollViewport;
  /* Objetos anexos*/
  uid:string;
  cartas:cards[] = [];
  
  
  /* Objetos de los input de busquedas */
  nombre:string = null;
  TipoSeleccionado: string = null;
  EdicionSeleccionado: string = null;
  CosteSeleccionado: string = null;
  
  /*Elementos seleccionados */
  VerSeleccion: string = '';
  
  
  ediciones: any[] = [
    {
      "edicion":"Espada Sagrada"
    },
    {
      "edicion":"Cruzadas"
    },
    {
      "edicion":"Helenica"
    },
    {
      "edicion":"Imperio"
    },
    {
      "edicion":"Hijos de Daana"
    },
    {
      "edicion":"Tierras Altas"
    },
    {
      "edicion":"Dominios de Ra"
    },
    {
      "edicion":"Encrucijada"
    },
    {
      "edicion":"CO Compendium"
    }

  ]


  costes: any[] = [
    {
     "coste": 0
    },
    {
      "coste": 1
    },
    {
      "coste": 2
    },
    {
      "coste": 3
    },
    {
      "coste": 4
    },
    {
      "coste": 5
    },
    {
      "coste": 6
    },
    {
      "coste": 7
    },
    {
      "coste": 8
    },
    {
      "coste": 9
    },
    {
      "coste": 10
    },

  
  ];
 

  tipos: any[] = [
    {
      "tipo": "Aliado"
    },
    {
      "tipo": "Talisman"
    },
    {
      "tipo": "Totem"
    },
    {
      "tipo": "Arma"
    },
    {
      "tipo": "Oro"
    },
  ]

  constructor(private list: CardsService,
              private auth: AuthService,
              private router: Router) { 

  this.auth.leerToken();{
  this.auth.userToken;
  this.uid = this.auth.userToken;
  
    }                          
  }


  ngOnInit(): void {
 
  this.list.getCards(this.uid)
  .subscribe ( ( data: any ) =>{
    this.cartas = data; 
    });
  
  }


  BuscarNombre() {
    if(this.nombre != ""){
    //console.log(termino);
    this.cartas = this.cartas.filter(res=>{
      return res.nombre.toLocaleLowerCase().match(this.nombre.toLocaleLowerCase());
    });
    }else if(this.nombre ==""){
      this.ngOnInit();
    }  
  }


  BuscarCoste(event : any){
    if(event != null){
      this.cartas = this.cartas.filter(res=>{
        return res.coste.match(event.target.value);
      });
    }else {
      this.ngOnInit();
    }
  }



  BuscarEdicion(){
    if(this.EdicionSeleccionado != ""){
      this.cartas = this.cartas.filter(res=>{
        return res.edicion.match(this.EdicionSeleccionado);
      });
    }else{
      this.ngOnInit();
    }

  }


  BuscarTipo(){
    if(this.TipoSeleccionado != ""){
      this.cartas = this.cartas.filter(res=>{
        return res.tipo.match(this.TipoSeleccionado);
      });
    }else{
      this.ngOnInit();
    }
  }



  LimpiaCampo(){

  if(this.nombre !="" || this.TipoSeleccionado !="" || this.EdicionSeleccionado !="" || this.CosteSeleccionado != ""){
   this.nombre = null;
   this.CosteSeleccionado = null;
   this.TipoSeleccionado = null;
   this.EdicionSeleccionado = null;
   this.ngOnInit();
  }else{
    console.log("no pasa naa!");
  }
    
  }


 
  



}
