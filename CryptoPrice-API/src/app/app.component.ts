import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';


interface Coin{
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number
  price_change_percentage_24: number
  total_volume: number

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  coins: Coin[] = []
  filteredcoins: Coin[] = [];
  titles: string [] = [
    '#',
    'Coin',
    'Price',
    '24hr Volume',
  ] 
  searchText = '';

  constructor(private http: HttpClient) {}

  searchCoin(){
    
   this.filteredcoins = this.coins.filter(coin => coin.name.toLowerCase().includes(this.searchText.toLowerCase()) || coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
   
   )
  }

  ngOnInit(){
    this.http.get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .subscribe(
      (res) => {
        
        this.coins = res;
        this.filteredcoins = res;
      },
      (err) => console.log(err)
    );
  }
 
}
