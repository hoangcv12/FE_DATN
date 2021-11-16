import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'
  ]
})
export class HomeComponent implements OnInit {
  array = ["anh1.png", "anh2.jpg", "anh3.jpg"];
  constructor() { }

  ngOnInit(): void {
  }

}
