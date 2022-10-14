import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LibraryComponent } from './library/library.component';
import { RecommenderComponent } from './recommender/recommender.component';
import { HeaderComponent } from './main-components/header/header.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { NavigationComponent } from './main-components/navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AnalyticsComponent,
    LibraryComponent,
    RecommenderComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
