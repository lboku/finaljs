let mainDiv = document.getElementById("game");
let gamesLi = document.querySelector("nav ul li:nth-child(3)");
let myStorefull = document.getElementById("mystore-div");
let domtrailer = document.getElementById("play-trailer");
let trailerContainer = document.getElementById("trailer-for-dom");
let iframe = null;
if (trailerContainer) {
  iframe = trailerContainer.querySelector("iframe");
}

let arrayForShop = [];
let isAddedArray = []; // თითოეული divForplusminus-ისთვის ცალკე სტატუსი

async function asyncfunction() {
  try {
    let response = await fetch(
      "https://www.cheapshark.com/api/1.0/deals?upperPrice=15"
    );

    if (!response.ok) {
      throw new Error("can not fetch data");
    }
    let data = await response.json();

    data.forEach((element, index) => {
      let divWrapper = document.createElement("div");
      divWrapper.classList.add("game-card");

      let imagethumb = document.createElement("img");
      imagethumb.classList.add("imagethumb");
      imagethumb.src = element.thumb;

      let contentGameP = document.createElement("div");
      contentGameP.classList.add("contentGameP");

      let titleP = document.createElement("p");
      titleP.classList.add("titleP");
      titleP.textContent = `${element.title}`;

      let dealRatingP = document.createElement("p");
      dealRatingP.classList.add("dealRatingP");
      dealRatingP.textContent = ` rating: ${element.dealRating}`;

      let savingsP = document.createElement("p");
      savingsP.classList.add("savingsP");
      savingsP.textContent = `SALE : ${Math.floor(element.savings)} %`;

      let priceDiv = document.createElement("div");
      priceDiv.classList.add("priceDiv");

      let linediv = document.createElement("div");
      linediv.classList.add("lineDiv");

      let priceP = document.createElement("p");
      priceP.classList.add("priceP");
      priceP.textContent = `${element.normalPrice}`;

      let salePriceP = document.createElement("p");
      salePriceP.classList.add("salepriceP");
      salePriceP.textContent = `${element.salePrice}`;

      //აქ ვცდილობ შევქმნა რაოდენობები  აითემების
      let divForplusminus = document.createElement("div");
      divForplusminus.classList.add("divForplusminus");

      let imgPlus = document.createElement("img");
      imgPlus.src = "../image/plus.svg";
      imgPlus.classList.add("imgPlus");

      let imgminus = document.createElement("img");
      imgminus.src = "../image/minus.svg";
      imgminus.classList.add("imgminus");

      divForplusminus.appendChild(imgPlus);
      divForplusminus.appendChild(imgminus);

      // ინიციალიზაცია index-ზე შესაბამისი სტატუსის
      // isAddedArray[index] = false;

      // divForplusminus.addEventListener("click", function () {
      //   imgPlus.classList.toggle("showplus");
      //   imgminus.classList.toggle("showminus");

      //   if (!isAddedArray[index]) {
      //     let divForArray = document.createElement("div");
      //     divForArray.classList.add(`shop-${element.internalName}`);
      //     divForArray.innerHTML = `
      //     <img src="${element.thumb}" alt="${element.title}">
      //     <p>${element.title}</p>
      //     <p>Rating: ${element.dealRating}</p>
      //     <p>Savings: ${Math.floor(element.savings)}%</p>
      //     <p>Normal Price: $${element.normalPrice}</p>
      //     <p>Sale Price: $${element.salePrice}</p>
      // `;
      //     // მაგალითად ტექსტი
      //     document.body.appendChild(divForArray);
      //     arrayForShop.push(divForArray);
      //     console.log(arrayForShop);
      //     isAddedArray[index] = true;
      //     arrayForShop[index] = divForArray;
      //     isAddedArray[index] = true;
      //   } else {
      //     let itemToRemove = arrayForShop[index];
      //     if (itemToRemove) {
      //       itemToRemove.remove(); // DOM-იდან შლა
      //       arrayForShop[index] = null; // array-ში გასუფთავება
      //     }
      //     isAddedArray[index] = false;
      //     if (arrayForShop.length > 0) {
      //       arrayForShop.pop();
      //     }
      //     console.log(arrayForShop);
      //     isAddedArray[index] = false;
      //     console.log("Removed last item");
      //   }
      //   // 1. ვიღებთ კონტეინერს, თუ არსებობს (ან ახალს შევქმნით)
      //   let myStoreDiv = document.getElementById("mystore");
      //   if (!myStoreDiv) {
      //     myStoreDiv = document.createElement("div");
      //     myStoreDiv.id = "mystore";
      //     openStoreDiv.appendChild(myStoreDiv);
      //   }

      //   // 2. ვაყენებთ კონტეინერში ტექსტად length-ის მნიშვნელობას
      //   myStoreDiv.textContent = arrayForShop.length;
      //   if (arrayForShop.length !== 0) {
      //     myStoreDiv.classList.remove("ittt");
      //   } else {
      //     myStoreDiv.classList.add("ittt");
      //   }
      // });

      isAddedArray[index] = false;

      divForplusminus.addEventListener("click", function () {
        imgPlus.classList.toggle("showplus");
        imgminus.classList.toggle("showminus");

        if (!isAddedArray[index]) {
          // შექმენი ერთი div
          let shopItem = document.createElement("div");
          shopItem.classList.add("shop-item");

          // image
          let img = document.createElement("img");
          img.classList.add("imagethumb");
          img.src = element.thumb;
          shopItem.appendChild(img);

          // content
          let contentDiv = document.createElement("div");
          contentDiv.classList.add("contentGameP");

          let title = document.createElement("p");
          title.classList.add("titleP");
          title.textContent = element.title;
          contentDiv.appendChild(title);

          let rating = document.createElement("p");
          rating.classList.add("dealRatingP");
          rating.textContent = `Rating: ${element.dealRating}`;
          contentDiv.appendChild(rating);

          let savings = document.createElement("p");
          savings.classList.add("savingsP");
          savings.textContent = `Savings: ${Math.floor(element.savings)}%`;
          contentDiv.appendChild(savings);

          shopItem.appendChild(contentDiv);

          // priceDiv
          let priceDiv = document.createElement("div");
          priceDiv.classList.add("priceDiv");

          let price = document.createElement("p");
          price.classList.add("priceP");
          price.textContent = element.normalPrice;

          let line = document.createElement("div");
          line.classList.add("lineDiv");

          let sale = document.createElement("p");
          sale.classList.add("salepriceP");
          sale.textContent = element.salePrice;

          priceDiv.appendChild(price);
          priceDiv.appendChild(line);
          priceDiv.appendChild(sale);

          shopItem.appendChild(priceDiv);
          let removeBtn = document.createElement("img");
          removeBtn.src = "../image/delete.png";
          removeBtn.classList.add("removeButton"); // ან წაშლის პატარა იკონი

          removeBtn.addEventListener("click", function () {
            shopItem.remove(); // DOM-იდან წაშლა
            arrayForShop[index] = null; // array-ში გასუფთავება
            isAddedArray[index] = false; // სტატუსის განახლება
          });
          shopItem.appendChild(removeBtn);

          // append-ში მხოლოდ shopItem
          myStorefull.appendChild(shopItem);
          arrayForShop[index] = shopItem;
          isAddedArray[index] = true;
        } else {
          let itemToRemove = arrayForShop[index];
          if (itemToRemove) {
            itemToRemove.remove();
            arrayForShop[index] = null;
          }
          isAddedArray[index] = false;
        }
      });

      // აამოქმედე divWrapper-ში ყველა ელემენტი
      divWrapper.appendChild(imagethumb);
      priceDiv.appendChild(priceP);
      priceDiv.appendChild(salePriceP);
      priceP.appendChild(linediv);
      divWrapper.appendChild(contentGameP);
      divWrapper.appendChild(priceDiv);
      divWrapper.appendChild(divForplusminus);
      contentGameP.appendChild(titleP);
      contentGameP.appendChild(dealRatingP);
      contentGameP.appendChild(savingsP);

      if (mainDiv) {
        mainDiv.appendChild(divWrapper);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

asyncfunction();

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
let openStoreDiv = document.getElementById("store-div");
openStoreDiv.addEventListener("click", function () {
  myStorefull.classList.toggle("div-for-store-show");
});
// აქაც დაცვა
let acordion = document.getElementById("assetto-accordion");
let assettoDiv = document.getElementById("image-assetto");

if (acordion && assettoDiv) {
  acordion.addEventListener("click", function () {
    assettoDiv.classList.add("show-image");
  });
}

if (acordion) {
  acordion.addEventListener("click", function () {
    acordion.classList.toggle("accordion-show");
  });
}

// iframe და ვიდეოს გამორთვის უსაფრთხოება
if (domtrailer && trailerContainer && iframe) {
  let originalSrc = iframe.getAttribute("src");

  domtrailer.addEventListener("click", function () {
    trailerContainer.classList.add("show-trailer");

    let src = iframe.getAttribute("src") || originalSrc;

    if (!src.includes("autoplay=1")) {
      src += (src.includes("?") ? "&" : "?") + "autoplay=1";
    }

    iframe.setAttribute("src", src);
  });

  let closeButton = document.getElementById("close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      trailerContainer.classList.remove("show-trailer");
      iframe.setAttribute("src", "");
    });
  }
}

// scroll to top ღილაკის უსაფრთხოება
const topBtn = document.querySelector(".top");
if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
