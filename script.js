let mainDiv = document.getElementById("game");
let gamesLi = document.querySelector("nav ul li:nth-child(2)");
let domtrailer = document.getElementById("play-trailer");
let trailerContainer = document.getElementById("trailer-for-dom");
let iframe = trailerContainer.querySelector("iframe");
async function asyncfunction() {
  try {
    let response = await fetch(
      "https://www.cheapshark.com/api/1.0/deals?upperPrice=15"
    );

    if (!response.ok) {
      throw new Error("can not fetch data");
    }
    let data = await response.json();

    data.forEach((element) => {
      //დივების შექმნა
      let divWrapper = document.createElement("div");
      divWrapper.classList.add("game-card");
      //თამაშის ფოტოები
      let imagethumb = document.createElement("img");
      imagethumb.classList.add("imagethumb");
      imagethumb.src = element.thumb;
      // თამაშის შესახებ
      let contentGameP = document.createElement("div");
      contentGameP.classList.add("contentGameP");
      //თამაშის სათაურები
      let titleP = document.createElement("p");
      titleP.classList.add("titleP");
      titleP.textContent = `${element.title}`;
      //თამაშის რეიტინგი
      let dealRatingP = document.createElement("p");
      dealRatingP.classList.add("dealRatingP");
      dealRatingP.textContent = ` rating: ${element.dealRating}`;
      //ვარსკვლავი

      //ფასდაკლება პროცენტებში
      let savingsP = document.createElement("p");
      savingsP.classList.add("savingsP");
      savingsP.textContent = `SALE : ${Math.floor(element.savings)} %`;
      //ფასების div
      let priceDiv = document.createElement("div");
      priceDiv.classList.add("priceDiv");
      //ხაზი
      let linediv = document.createElement("div");
      linediv.classList.add("lineDiv");
      //თამაშის ფასები
      let priceP = document.createElement("p");
      priceP.classList.add("priceP");
      priceP.textContent = `${element.normalPrice}`;
      // ფასდაკლება თამაშზე
      let salePriceP = document.createElement("p");
      salePriceP.classList.add("salepriceP");
      salePriceP.textContent = `${element.salePrice}`;

      // სათაურების და ფასების appendchild
      divWrapper.appendChild(imagethumb);
      priceDiv.appendChild(priceP);
      priceDiv.appendChild(salePriceP);
      priceP.appendChild(linediv);
      divWrapper.appendChild(contentGameP);
      divWrapper.appendChild(priceDiv);
      contentGameP.appendChild(titleP);
      contentGameP.appendChild(dealRatingP);
      contentGameP.appendChild(savingsP);
      document.body.appendChild(divWrapper);
      mainDiv.appendChild(divWrapper);
    });

    let normalPrice = document.createElement("p");
    document.getElementById("name").appendChild(normalPrice);
    normalPrice.textContent = data[0].normalPrice;
  } catch (error) {}
}
asyncfunction();
//dom რომ გამოჩნდეს თამაშების ლისტი
gamesLi.addEventListener("click", function () {
  mainDiv.classList.toggle("show");
});

let acordion = document.getElementById("assetto-accordion");
let assettoDiv = document.getElementById("image-assetto");

acordion.addEventListener("click", function () {
  assettoDiv.classList.toggle("show-image");
});

let showImage = acordion;
showImage.addEventListener("click", function () {
  showImage.classList.toggle("accordion-show");
});

// შენახე თავდაპირველი src
let originalSrc = iframe.getAttribute("src");

domtrailer.addEventListener("click", function () {
  trailerContainer.classList.add("show-trailer");

  // თუ src ცარიელია, დაუბრუნე თავდაპირველი
  if (!iframe.getAttribute("src")) {
    iframe.setAttribute("src", originalSrc);
  }

  // autoplay დაამატე, თუ არ არის
  let src = iframe.getAttribute("src");
  if (!src.includes("autoplay=1")) {
    iframe.setAttribute(
      "src",
      src + (src.includes("?") ? "&" : "?") + "autoplay=1"
    );
  }
});

let closeButton = document.getElementById("close");

closeButton.addEventListener("click", function () {
  trailerContainer.classList.remove("show-trailer");
  // ვიდეოს გაჩერება src-ს წაშლით
  iframe.setAttribute("src", "");
});
