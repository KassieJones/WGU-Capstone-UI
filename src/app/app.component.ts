import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'advancement-of-reading-association';
  public movieData: any[] = [];
  public bookData: any[] = [];

  constructor(private http: HttpClient){
    // this.getBookData();
    // this.getMovieData();
  }

  public getMovieData(): void {
    this.http.get('/assets/imdb_top_1000.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              this.movieData.push(row);
            }
        },
        error => {
            console.log(error);
        }
    );
  }

  public getBookData(): void {
    this.http.get('/assets/Best_Book_21st.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              this.bookData.push(row);
            }
            console.log(this.bookData)
        },
        error => {
            console.log(error);
        }
    );
  }
}
