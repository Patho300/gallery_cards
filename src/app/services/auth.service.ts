import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})



export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyDNROh71z2ODLSfjKlaw0AUd3BnDGybQHY';
  userToken: string;
  //api para crear nuevos usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) {
    this.leerToken();
   }

/*#############################################################################################################*/

  logout(){
    localStorage.removeItem('token');
  }

/*#############################################################################################################*/

  login(usuario:UsuarioModel){
    //constante que guardara la info 
    const authData = {
      email: usuario.email,
      password : usuario.password,
      returnSecureToken: true
    };

    return this.http.post( // todas las respuestas de la api pasan por este Post
      `${this.url}/accounts:signInWithPassword?key=${this.apikey}`,authData 
      ).pipe( 
         map( resp => {
           this.guardarToken( resp['idToken']);
           return resp;
         })
       );
  }

/*#############################################################################################################*/

  nuevoUsuario(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apikey}`,authData // datos que retornara nuevo usuario
      ).pipe( 
        map( resp => {
         this.guardarToken( resp['idToken']);
         return resp;
        })
      );
  }

/*#############################################################################################################*/

  private guardarToken( idToken: string ){
    
    this.userToken = idToken;
    localStorage.setItem('token', idToken); //se guarda el registro token con el tipo de dato de idToken
    
  }
/*#############################################################################################################*/

  leerToken() {
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
      return this.userToken;
  }



/*#############################################################################################################*/


  estaAutenticado() : boolean {
  
    if ( this.userToken.length <2 ){
      return false;
    }
  
    const expira = Number(localStorage.getItem('expira')); // obtiene de localstorage la variable expira y la transforma a numero
    const expiraDate = new Date();
    expiraDate.setTime(expira);
  
    if( expiraDate > new Date() ){
      return true;
    }else{
      return false;
    }
  
    return this.userToken.length >2;
  }

}