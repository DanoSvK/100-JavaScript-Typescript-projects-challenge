class CryptoApp {
  // Selectors
  paginationEl = document.querySelector(".pagination") as HTMLDivElement;

  // Logic
  currPage = 1;
  items = 15;
  itemsPerPage = 3;
  isPriceAscending = true;
  isMarketCapAscending = true;
  is24hChangeAscending = true;
  fetchedData: [] = [];
  constructor() {
    this.getData();
    this.paginationEl.addEventListener("click", (e) => {
      this.getPageData(e);
    });

    document
      .querySelector(".btn-market-cap")!
      .addEventListener("click", this.sortMarketCap.bind(this));

    document
      .querySelector(".btn-price")!
      .addEventListener("click", this.sortPrice.bind(this));

    document
      .querySelector(".btn-24h-change")!
      .addEventListener("click", this.sort24hChange.bind(this));

    document
      .querySelectorAll(".btn")
      .forEach((arrow) =>
        arrow.addEventListener("click", this.handleSortArrows)
      );
  }

  // Slicing data items from array based on the current page
  getPage(data: any, page: number = this.currPage) {
    this.currPage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = page * this.itemsPerPage;
    return data.slice(start, end);
  }

  getPageData(e: Event) {
    const buttonElement = e.target as HTMLButtonElement;
    const closestBtnElement = buttonElement.closest(
      ".btn"
    ) as HTMLElement | null;

    if (closestBtnElement) {
      const gotoValue = closestBtnElement.dataset.goto;

      if (gotoValue) {
        this.currPage = +gotoValue;
        this.getData();
      } else {
        console.log('Dataset property "goto" not found');
      }
    } else {
      console.log('Ancestor element with class "btn" not found');
    }
  }

  getData = (): void => {
    const fetchData = (): void => {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.items}&page=1&sparkline=false&locale=en&precision=2`
      )
        .then((res: Response) => res.json())
        .then((data: any) => {
          this.fetchedData = data;
          this.renderData(data);
          console.log(data);
        });
    };
    fetchData();
  };

  sortPrice(e: Event) {
    e.preventDefault();
    this.currPage = 1;
    this.fetchedData.sort((a: any, b: any) => {
      return this.isPriceAscending
        ? a.current_price - b.current_price
        : b.current_price - a.current_price;
    });
    this.isPriceAscending = !this.isPriceAscending;

    this.renderData(this.fetchedData);
  }

  sortMarketCap(e: Event) {
    e.preventDefault();
    this.currPage = 1;
    this.fetchedData.sort((a: any, b: any) => {
      return this.isMarketCapAscending
        ? a.market_cap - b.market_cap
        : b.market_cap - a.market_cap;
    });
    this.isMarketCapAscending = !this.isMarketCapAscending;

    this.renderData(this.fetchedData);
  }

  sort24hChange(e: Event) {
    e.preventDefault();
    this.currPage = 1;
    this.fetchedData.sort((a: any, b: any) => {
      return this.is24hChangeAscending
        ? a.price_change_percentage_24h - b.price_change_percentage_24h
        : b.price_change_percentage_24h - a.price_change_percentage_24h;
    });
    this.is24hChangeAscending = !this.is24hChangeAscending;

    this.renderData(this.fetchedData);
  }

  // Rendering markups method
  renderData(data: any) {
    const listEl = document.querySelector(".list") as HTMLDivElement;
    // Slicing data
    const pagesOfData = this.getPage(data, this.currPage);
    this.paginationEl.innerHTML = this.paginationMarkup();

    listEl.innerHTML = "";
    pagesOfData.map((el: any) => {
      listEl.innerHTML += this.markup(el);
    });
  }

  handleSortArrows(e: Event) {
    const arrows = document.querySelectorAll(
      ".arrow"
    ) as NodeListOf<HTMLSpanElement>;
    /* Reset arrow to default (invisible + 0 deg). 
    Rotate-arrow class set to important to overwrite inline-style */
    arrows.forEach((arrow) => {
      arrow.classList.add("inactive");
      arrow.classList.add("rotate-arrow");
    });

    /* Accessing respective arrow, toggling inactive to be always visible
     and removing rotate-arrow to make inline style overwrite class */
    const target = e.target as HTMLSpanElement;
    target.querySelector(".arrow")?.classList.toggle("inactive");
    target.querySelector(".arrow")?.classList.remove("rotate-arrow");
    const arrowElement = target.querySelector(".arrow") as HTMLSpanElement;

    // Toggling between 0deg and 180deg
    if (arrowElement.style.transform == "rotate(180deg)") {
      arrowElement.style.transform = "rotate(0deg)";
    } else {
      arrowElement.style.transform = "rotate(180deg)";
    }
  }

  // Main data markup method
  markup(data: any) {
    const priceChange: number = data.price_change_percentage_24h.toFixed(2);
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

  // Pagination markup method
  paginationMarkup(): string {
    const totalPages = Math.ceil(this.items / this.itemsPerPage);
    // First page and other pages
    if (this.currPage === 1 && totalPages > 1) {
      return `<button class="btn btn-next" data-goto="${
        this.currPage + 1
      }">Page ${this.currPage + 1} ></button>`;
    }

    // Last page
    if (this.currPage === totalPages) {
      return `<button class="btn btn-previous" data-goto="${
        this.currPage - 1
      }">< Page ${this.currPage - 1}</button>`;
    }

    // Other pages
    if (this.currPage < totalPages) {
      return `<button class="btn btn-previous" data-goto="${
        this.currPage - 1
      }">< Page ${this.currPage - 1}</button>
      <button class="btn btn-next" data-goto="${this.currPage + 1}">Page ${
        this.currPage + 1
      }></button>`;
    }

    // First page and no other pages
    else {
      return "";
    }
  }
}

new CryptoApp();
