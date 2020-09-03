import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'; 
import{ HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

//carga de componentes
import { AppComponent } from './app.component';

//importacion de rutas
import { ROUTES } from './app.routes';

//carga de servicios
import { CardsService } from './services/cards.service';
import { GalleryTestComponent } from './components/gallery-test/gallery-test.component';


@NgModule({
  declarations: [
    AppComponent,
    GalleryTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ScrollingModule,
    RouterModule.forRoot(ROUTES,{ useHash: true}),
    FormsModule
  ],
  providers: [
    CardsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
