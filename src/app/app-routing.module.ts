import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { appRoutePaths } from './app.routes';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { RecommenderComponent } from './recommender/recommender.component';

const routes: Routes = [
    {
        path: appRoutePaths.about,
        component: AboutComponent
    },
    {
        path: appRoutePaths.analytics,
        component: AnalyticsComponent
    },
    {
        path: appRoutePaths.library,
        component: LibraryComponent
    },
    {
        path: appRoutePaths.recommender,
        component: RecommenderComponent
    },
    {
        path: appRoutePaths.home,
        component: HomeComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
