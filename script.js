let mainDiv = document.getElementById("game");
let gamesLi = document.querySelector("nav ul li:nth-child(2)");
let myStorefull=document.getElementById('mystore-div')
let domtrailer = document.getElementById("play-trailer");
let trailerContainer = document.getElementById("trailer-for-dom");
let iframe = null;
if (trailerContainer) {
  iframe = trailerContainer.querySelector("iframe");
}

let arrayForShop = [];
let isAddedArray = [];  // თითოეული divForplusminus-ისთვის ცალკე სტატუსი

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
      divWrapper.classList.add("game-card");;

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
      isAddedArray[index] = false;

      divForplusminus.addEventListener("click", function () {
        imgPlus.classList.toggle("showplus");
        imgminus.classList.toggle("showminus");

        if (!isAddedArray[index]) {
          let divForArray = document.createElement("div");
          divForArray.classList.add("shop-item");
          divForArray.textContent = element.title;
 // მაგალითად ტექსტი

          document.body.appendChild(divForArray);

          arrayForShop.push(divForArray);
          isAddedArray[index] = true;

          
        } else {
          if (arrayForShop.length > 0) {
            let lastDiv = arrayForShop.pop();
            lastDiv.remove();
          }
          isAddedArray[index] = false;
         
        }
        // 1. ვიღებთ კონტეინერს, თუ არსებობს (ან ახალს შევქმნით)
let myStoreDiv = document.getElementById("mystore");
if (!myStoreDiv) {
  myStoreDiv = document.createElement("div");
  document.body.appendChild(myStoreDiv);
}

// 2. ვაყენებთ კონტეინერში ტექსტად length-ის მნიშვნელობას
myStoreDiv.textContent = arrayForShop.length;
if (arrayForShop.length !== 0) {
  myStoreDiv.classList.remove('ittt');
  
  
} else {
  myStoreDiv.classList.add('ittt');
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

let openStoreDiv = document.getElementById('store-div');
let newDiv = document.createElement('div');
openStoreDiv.addEventListener('click', function() {
  newDiv.classList.toggle('div-for-store');
  myStorefull.appendChild(newDiv);
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
