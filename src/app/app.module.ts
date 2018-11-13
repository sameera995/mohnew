import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'src/polyfills';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainWindowComponent } from './main-window/main-window.component';
import { LoginComponent } from './login/login.component';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { ModalComponent } from './modal/modal.component';
import {
  AlertModule,
  BsDatepickerModule,
  BsDropdownModule,
  CarouselModule, ModalModule,
  TabsModule,
  TimepickerModule
} from "ngx-bootstrap";
import { AboutComponent } from './home/about/about.component';
import { AreaComponent } from './area/area.component';
import {AppRoutingModule} from "./app-routing.module";
import { ClinicComponent } from './clinic/clinic.component';
import { ClinicAllocationComponent } from './clinic/clinic-allocation/clinic-allocation.component';
import { PersonComponent } from './person/person.component';
import { ClinicCreationComponent } from './clinic/clinic-creation/clinic-creation.component';
import {ChartsModule} from "ng2-charts";
import { UserComponent } from './user/user.component';
import { CampaignComponent } from './campaign/campaign.component';
import {CommonModule} from "@angular/common";
import {JwtModule} from "@auth0/angular-jwt";
import {RouterModule} from "@angular/router";
import { CampaignAllocationComponent } from './campaign/campaign-allocation/campaign-allocation.component';
import { CampaignCreationComponent } from './campaign/campaign-creation/campaign-creation.component';


const jwtConfig = {
  tokenGetter: () => sessionStorage.getItem('token'),
  whitelistedDomains: ['localhost:8080'],
  blacklistedRoutes: ['localhost:8080/login', 'localhost:8080/register'],
  throwNoTokenError: false
};

@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  declarations: [],
})

export class DemoMaterialModule {}
@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    MainWindowComponent,
    LoginComponent,
    EmployeeComponent,
    ModalComponent,
    AboutComponent,
    AreaComponent,
    ClinicComponent,
    ClinicAllocationComponent,
    ClinicCreationComponent,
    PersonComponent,
    UserComponent,
    CampaignComponent,CampaignAllocationComponent,
    CampaignCreationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ChartsModule,
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    MatSelectModule,
    CommonModule,
    JwtModule.forRoot({config: jwtConfig}),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

