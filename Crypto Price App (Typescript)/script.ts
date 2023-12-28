// // const price =
// //   "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&include_last_updated_at=true&precision=2";

// // const change =
// //   "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30";

// // const coinsList = "https://api.coingecko.com/api/v3/coins/list";

// // const allCoins =
// //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&precision=2";

class CryptoApp {
  constructor() {
    this.getData();
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getPage(page: number, data: any) {
    const start = (page - 1) * 10;
    const end = page * 10;
    return data.slice(start, end);
  }

  getData = (): void => {
    const itemsPerPage = 250;
    const rateLimitDelay = 3000;
    let page = 1;
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}
      
      &page=${page}&sparkline=false&locale=en&precision=2`
    )
      .then((res: Response) => res.json())
      .then((data: any) => {
        console.log(this.getPage(2, data));
        // page++;
        // data.map((el: any) => {
        //   document.querySelector(".list")!.innerHTML += this.markup(el);
        // });

        // return this.sleep(rateLimitDelay).then(this.getData);
      });
  };

  markup(data: any) {
    const priceChange: number = +(
      (100 / data.current_price) *
      data.price_change_24h
    ).toFixed(2);
    return `<div class="coin">
        <div class="basic-info">
            <img
                src=${data.image}
                alt="" />
            <div class="basic-info__flex">
                <p class="title">${data.name}</p>
                <p class="market-cap">$${data.market_cap
                  .toString()
                  .slice(0, 3)}</p>
            </div>
        </div>
        <p class="price">$${data.current_price.toFixed(2)}</p>
        <p class="price-change ${
          priceChange > 0 ? "price-change-increase" : "price-change-decrease"
        }">${isFinite(priceChange) ? priceChange : "0.00"} %</p>
    </div>`;
  }
}

new CryptoApp();

// Sorting functionality
let isAscending = false;

document.querySelector(".btn")!.addEventListener("click", (e) => {
  e.preventDefault();
  const arr = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image:
        "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      current_price: 42635,
      market_cap: 833985155308,
      market_cap_rank: 1,
      fully_diluted_valuation: 894325830109,
      total_volume: 23446834605,
      high_24h: 43789,
      low_24h: 42324,
      price_change_24h: -371.60079922046134,
      price_change_percentage_24h: -0.86405,
      market_cap_change_24h: -7553907517.581665,
      market_cap_change_percentage_24h: -0.89763,
      circulating_supply: 19583118,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69045,
      ath_change_percentage: -38.53111,
      ath_date: "2021-11-10T14:24:11.849Z",
      atl: 67.81,
      atl_change_percentage: 62489.11535,
      atl_date: "2013-07-06T00:00:00.000Z",
      roi: null,
      last_updated: "2023-12-28T18:33:30.495Z",
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      current_price: 2368.32,
      market_cap: 284022533707,
      market_cap_rank: 2,
      fully_diluted_valuation: 284022533707,
      total_volume: 29080628928,
      high_24h: 2442.31,
      low_24h: 2342.79,
      price_change_24h: 20.9,
      price_change_percentage_24h: 0.8905,
      market_cap_change_24h: 2290214162,
      market_cap_change_percentage_24h: 0.8129,
      circulating_supply: 120183735.874744,
      total_supply: 120183735.874744,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -51.76559,
      ath_date: "2021-11-10T14:24:19.604Z",
      atl: 0.432979,
      atl_change_percentage: 543344.62114,
      atl_date: "2015-10-20T00:00:00.000Z",
      roi: {
        times: 73.31583796016828,
        currency: "btc",
        percentage: 7331.583796016827,
      },
      last_updated: "2023-12-28T18:33:29.343Z",
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      current_price: 236.32,
      market_cap: 284022533707,
      market_cap_rank: 2,
      fully_diluted_valuation: 284022533707,
      total_volume: 29080628928,
      high_24h: 2442.31,
      low_24h: 2342.79,
      price_change_24h: 20.9,
      price_change_percentage_24h: 0.8905,
      market_cap_change_24h: 2290214162,
      market_cap_change_percentage_24h: 0.8129,
      circulating_supply: 120183735.874744,
      total_supply: 120183735.874744,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -51.76559,
      ath_date: "2021-11-10T14:24:19.604Z",
      atl: 0.432979,
      atl_change_percentage: 543344.62114,
      atl_date: "2015-10-20T00:00:00.000Z",
      roi: {
        times: 73.31583796016828,
        currency: "btc",
        percentage: 7331.583796016827,
      },
      last_updated: "2023-12-28T18:33:29.343Z",
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      current_price: 4368.32,
      market_cap: 284022533707,
      market_cap_rank: 2,
      fully_diluted_valuation: 284022533707,
      total_volume: 29080628928,
      high_24h: 2442.31,
      low_24h: 2342.79,
      price_change_24h: 20.9,
      price_change_percentage_24h: 0.8905,
      market_cap_change_24h: 2290214162,
      market_cap_change_percentage_24h: 0.8129,
      circulating_supply: 120183735.874744,
      total_supply: 120183735.874744,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -51.76559,
      ath_date: "2021-11-10T14:24:19.604Z",
      atl: 0.432979,
      atl_change_percentage: 543344.62114,
      atl_date: "2015-10-20T00:00:00.000Z",
      roi: {
        times: 73.31583796016828,
        currency: "btc",
        percentage: 7331.583796016827,
      },
      last_updated: "2023-12-28T18:33:29.343Z",
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      current_price: 3368.32,
      market_cap: 284022533707,
      market_cap_rank: 2,
      fully_diluted_valuation: 284022533707,
      total_volume: 29080628928,
      high_24h: 2442.31,
      low_24h: 2342.79,
      price_change_24h: 20.9,
      price_change_percentage_24h: 0.8905,
      market_cap_change_24h: 2290214162,
      market_cap_change_percentage_24h: 0.8129,
      circulating_supply: 120183735.874744,
      total_supply: 120183735.874744,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -51.76559,
      ath_date: "2021-11-10T14:24:19.604Z",
      atl: 0.432979,
      atl_change_percentage: 543344.62114,
      atl_date: "2015-10-20T00:00:00.000Z",
      roi: {
        times: 73.31583796016828,
        currency: "btc",
        percentage: 7331.583796016827,
      },
      last_updated: "2023-12-28T18:33:29.343Z",
    },
  ];

  isAscending
    ? arr.sort((a: any, b: any) => a.current_price - b.current_price)
    : arr.sort((a: any, b: any) => b.current_price - a.current_price);
  console.log(arr.map((el) => el?.current_price));
  isAscending = isAscending ? false : true;
});
