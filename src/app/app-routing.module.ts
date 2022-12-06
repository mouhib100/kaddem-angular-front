import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartementTableComponent } from './departments/departement-table/departement-table.component';
import { UniversiteTableDetailsComponent } from './universities/universite-table-details/universite-table-details.component';
import { UniversiteTableComponent } from './universities/universite-table/universite-table.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, AppRoutingRoutingModule],
})
export class AppRoutingModule {}
