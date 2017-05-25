import { Component } from '@angular/core';
import { CatService } from './cat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  allCats:Array<any> = null;
  cats:Array<any> = null;

  favoriteCats:Array<any> = null;
  votedCats:Array<any> = null;

  possibleScores:Array<number> = [1,2,3,4,5,6,7,8,9,10];

  constructor(private catService:CatService){
  }

  ngOnInit(){
    this.refresh();
  }

  nextCat(){
    this.cats = [];
    var cat = this.allCats.shift();
    this.cats.push(cat);
  }

  refresh(){
    this.catService.getCats()
      .subscribe(cats => {
        this.allCats = cats.response.data.images.image;
        this.nextCat();
      });


    this.catService.getFavoriteCats()
      .subscribe(favoriteCats => {
        this.favoriteCats = favoriteCats.response.data.images.image;
      })

    this.catService.getVotes()
      .subscribe(votedCats => {
        this.votedCats = votedCats.response.data.images.image;
      })
  }

  onFavorite(image){
    this.catService.favorite(image)
      .subscribe(res => {
        alert('Favorited!');
      });
  }

  onSave(image){
    this.catService.save(image)
      .subscribe(res => {
        alert('Saved!');
      });
  }

}
