import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculoComponent} from './veiculo/veiculo.component';

const routes: Routes = [
  {path: 'veiculo', component: VeiculoComponent},
  //{path: '', redirectTo: 'home'},
  //{path: '**', component: PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
