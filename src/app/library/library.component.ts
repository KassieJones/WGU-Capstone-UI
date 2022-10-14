import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Book {
  title: string,
  author: string,
  genres: string
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  public BOOK_DATA: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'genres'];
  dataSource: Book[] = [];

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
}
