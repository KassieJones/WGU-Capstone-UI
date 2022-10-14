import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { movies } from 'src/assets/movie-data';
import { Book } from '../library/library.component';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  public BOOK_DATA: Book[] = [];

  @ViewChild("chart") chart: ChartComponent;
  public movieChartOptions: Partial<ChartOptions> | any;
  public bookChartOptions: Partial<ChartOptions> | any;
  public logChartOptions: Partial<ChartOptions> | any;
  public recommendationChartOptions: Partial<ChartOptions> | any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>("/logs/logs").subscribe(data => this.logChartOptions = this.createLogChartData(data));
    this.movieChartOptions = this.createMovieChartData();
    this.getRawBookData();
  }

  public getRawBookData(): void {
    this.http.get('/assets/test1.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length; index++) {
              let row = csvToRowArray[index].split(`,`);
              let bookObject: Book = this.createBookObject(row);
              this.BOOK_DATA.push(bookObject);
            }
            this.bookChartOptions = this.createBookChartData(this.BOOK_DATA);
        },
        error => {
            console.log(error);
        }
    );
  }
  public createBookObject(row: string[]): Book {
    return {
      title: row[0],
      author: row[1],
      genres: row[2]
    }
  }

  public createMovieChartData(): ChartOptions {
    let genreList: string[] = [];
    movies.map((movie)=> {
      const split: string[] = movie.content.split(" ")
      split.forEach((genre)=> genreList.push(genre));
    });
    
    const genreMap = new Map();
    genreList.forEach((genre)=> {
      if(genreMap.has(genre)){
        const count = genreMap.get(genre);
        genreMap.set(genre, count+1)
      } else {
        genreMap.set(genre, 1)
      }
    })

    const labels = [...genreMap.keys()];
    const series = [...genreMap.values()]

    return {
      series,
      chart: {
        width: 650,
        type: "pie"
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }

  }

  public createBookChartData(books: Book[]): ChartOptions {
    let genreList: string[] = [];
    books.map((book)=> {
      const split: string[] = book.genres.split(" ")
      split.forEach((genre)=> genreList.push(genre));
    });
    
    const genreMap = new Map();
    genreList.forEach((genre)=> {
      if(genreMap.has(genre)){
        const count = genreMap.get(genre);
        genreMap.set(genre, count+1)
      } else {
        genreMap.set(genre, 1)
      }
    })

    const labels = [...genreMap.keys()];
    const series = [...genreMap.values()]

    return {
      series,
      chart: {
        width: 650,
        type: "pie"
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }

  }

  public createLogChartData(data: Book[]): ChartOptions {
    let genreList: string[] = [];
    data.map((book)=> {
      const split: string[] = book.genres.split(" ")
      split.forEach((genre)=> genreList.push(genre));
    });
    
    const genreMap = new Map();
    genreList.forEach((genre)=> {
      if(genreMap.has(genre)){
        const count = genreMap.get(genre);
        genreMap.set(genre, count+1)
      } else {
        genreMap.set(genre, 1)
      }
    })

    const labels = [...genreMap.keys()];
    const series = [...genreMap.values()]

    return {
      series,
      chart: {
        width: 650,
        type: "pie"
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }

  }

}
