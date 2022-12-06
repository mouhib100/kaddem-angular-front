import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContratEtudiantComponent } from './etudiant/contrat-etudiant/contrat-etudiant.component';
import { EquipeEtudiantComponent } from './etudiant/equipe-etudiant/equipe-etudiant.component';
import { EtudiantDepartementComponent } from './etudiant/etudiant-departement/etudiant-departement.component';
import { UniversiteTableComponent } from './universities/universite-table/universite-table.component';
import { DepartementTableComponent } from './departments/departement-table/departement-table.component';
import { UniversiteTableDetailsComponent } from './universities/universite-table-details/universite-table-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'etudiant',
    component: EtudiantComponent,
    children: [
      { path: 'departement', component: EtudiantDepartementComponent },
    ],
  },
  {
    path: 'utilisateur',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  { path: 'Contrat/:id', component: ContratEtudiantComponent },
  { path: 'equipe', component: EquipeEtudiantComponent },
  {
    path: 'universite',
    component: UniversiteTableComponent,
  },

  {
    path: 'departements',
    component: DepartementTableComponent,
  },
  {
    path: 'universite/:id',
    component: UniversiteTableDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingRoutingModule {}
