// nav 要素内のリンク (<a>)
const navLinks = document.querySelectorAll("nav a");
console.log(navLinks);

// 商品リスト (.product-list) 内の最初の商品 (.product-item)
const productItem = document.querySelector(
  ".product-list .product-item:first-child",
);
console.log(productItem);

// カートアイコンの画像 (<img>)
const cartImg = document.querySelector('img[alt="カート"]');
console.log(cartImg);

// 商品リスト (.product-list) 内の価格 (.price) を表示する要素
const prices = document.querySelectorAll(".product-list .price");
console.log(prices);

// 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
const productItemImages = document.querySelectorAll(
  ".product-list .product-item img",
);
console.log(productItemImages);

// 検索バー (.search-bar) 内の検索ボタン (<button>)
const searchButton = document.querySelector(".search-bar button");
console.log(searchButton);

// フッター (footer) 内のパラグラフ (<p>) 要素
const paragraphOfFooter = document.querySelector("footer p");
console.log(paragraphOfFooter);

// 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
const evenProductItems = document.querySelectorAll(
  ".product-list .product-item:nth-child(even)",
);
console.log(evenProductItems);

// ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
const accountImage = document.querySelector("header .account img");
console.log(accountImage);

// ナビゲーションリンクのうち、"会社情報" のリンク
const companyInfo = document.querySelector('nav a[href="#about"]');
console.log(companyInfo);
