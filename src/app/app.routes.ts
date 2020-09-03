import {Routes} from '@angular/router';

/* Components */
import { GalleryTestComponent } from './components/gallery-test/gallery-test.component';



//configuracion de las redireccion de las rutas del proyecto

export const ROUTES: Routes = [
    /*{ path: 'login', component: LoginComponent },*/
    { path: 'gallery_test', component: GalleryTestComponent},
    { path: '', pathMatch: 'full', redirectTo: 'gallery_test'},
    { path: '**', pathMatch: 'full', redirectTo: 'gallery_test'}
];
