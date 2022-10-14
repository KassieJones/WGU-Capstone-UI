import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { movies } from 'src/assets/movie-data';
import { Book } from '../library/library.component';

interface Movie {
  title: string;
  content: string;
}

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.scss']
})

export class RecommenderComponent implements OnInit {

  public movies = movies;
  public BOOK_DATA: Book[] = [];

  displayedColumns: string[] = ['title', 'author', 'genres'];
  dataSource: Book[] = [];
  public chosenGenres: string = "";
  public recommender: Book[] = [];



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRawBookData();
  }

  public getRawBookData(): any {
    this.http.get('/assets/test1.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length; index++) {
              let row = csvToRowArray[index].split(`,`);
              let bookObject: Book = this.createBookObject(row);
              this.BOOK_DATA.push(bookObject);
            }
            this.dataSource = this.BOOK_DATA;
            return this.BOOK_DATA;
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

  public selectMovie(movie: Movie): void {
    const books = this.BOOK_DATA;
    this.chosenGenres = movie.content;
    const genres: string[] = movie.content.split(' ');
    const recommendations: Book[] = [];
    console.log(genres);
      genres.forEach((genre)=> {
        books.forEach((book)=> {
          if(book.genres.includes(genre)){
            recommendations.push(book)
          }
        })

      });
    
    const bookRecommendationMap = new Map<string, any>();

    recommendations.forEach((rec) => {
      if(bookRecommendationMap.has(rec.title)){
        const count = bookRecommendationMap.get(rec.title);
        const newCount: number = count + 1;
        bookRecommendationMap.set(rec.title, newCount)
      } else {
        bookRecommendationMap.set(rec.title, 1);
      }
    })

    let count: number = 0;
    for (let [key, value] of bookRecommendationMap) {
      if(value > count){
        count = value
      }
    }

    let backToBooks: Book[] = [];
    for (let [key, value] of bookRecommendationMap) {
      if(value === count){
        const temp = books.find((book) => book.title === key);
        if(temp){
          backToBooks.push(temp);
        }
      }
    }

    this.dataSource = backToBooks;
    this.http.post<any>("/logs/logs", { books: backToBooks }).subscribe();
  }
}