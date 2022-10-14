import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutePaths } from 'src/app/app.routes';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigateToHome(): void {
    this.router.navigate([appRoutePaths.home]);
  }

  public navigateToAbout(): void {
    this.router.navigate([appRoutePaths.about]);
  }

  public navigateToAnalytics(): void {
    this.router.navigate([appRoutePaths.analytics]);
  }

  public navigateToLibrary(): void {
    this.router.navigate([appRoutePaths.library]);
  }

  public navigateToRecommender(): void {
    this.router.navigate([appRoutePaths.recommender]);
  }

}
