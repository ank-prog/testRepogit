import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  imageList: any = [];
  data:any = [];
  page = 0;
  size = 4;
  
  constructor(private http: HttpClient) {
    this.getImageList();
  }

  getImageList() {
    this.http.get('http://localhost:3000/GirlImages').subscribe((res) => {
      this.imageList = res;
      console.log(this.imageList);
      this.getData({pageIndex: this.page, pageSize: this.size});
    });
    
  }

  ngOnInit() {
    this.getData({pageIndex: this.page, pageSize: this.size});
  }
  getData(obj:any) {
    console.log(obj)
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.data = this.imageList.filter((res:any) => {
      console.log(res)
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
    console.log(this.data)
  }
  
}
