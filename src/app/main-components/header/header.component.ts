import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/library/library.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  public getLogs(): any {
    this.http.get<any>("/logs/logs").subscribe(data => {
      const bookArrays: string[][] = [];
      data.forEach((recommendation: Book)=> {
        const record: string[] = [`${recommendation.title}`, `${recommendation.author}`, `${recommendation.genres}`];
        bookArrays.push(record);
      });

      let csv = "Title,Author,Genres\n"
      
      bookArrays.forEach(function(row) {  
        csv += row.join(',');  
        csv += "\n";  
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      const timestamp = new Date();
      const title = `Recommendation Log ${timestamp}.csv`
      a.setAttribute('href', url);
      a.setAttribute('download', title);
      a.click();
    });
  }

}
