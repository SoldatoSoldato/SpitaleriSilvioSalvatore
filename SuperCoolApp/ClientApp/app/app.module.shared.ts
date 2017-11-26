import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ClientiComponent } from './components/Clienti/clienti.component';
import { RivenditoriAutoComponent } from './components/RivenditoriAuto/rivenditoriAuto.component';
import { VettureComponent } from './components/Vetture/vetture.component';
@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ClientiComponent,
        RivenditoriAutoComponent,
        VettureComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'clienti', component: ClientiComponent },
            { path: 'rivenditoriAuto', component: RivenditoriAutoComponent },
            { path: 'vetture', component: VettureComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
