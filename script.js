let mainDiv= document.getElementById('game')





async function asyncfunction() {
  try {
    let response = await fetch(
      "https://www.cheapshark.com/api/1.0/deals?upperPrice=15"
    );
    console.log(response);
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
      let contentGameP =document.createElement('div')
      contentGameP.classList.add('contentGameP')
      //თამაშის სათაურები
      let titleP = document.createElement("p");
      titleP.classList.add("titleP");
      titleP.textContent = `${element.title}`;
      //თამაშის რეიტინგი
      let dealRatingP = document.createElement("p");
      dealRatingP.classList.add('dealRatingP')
      dealRatingP.textContent = ` rating: ${element.dealRating}`;
      //ვარსკვლავი
  
      //ფასდაკლება პროცენტებში
      let savingsP = document.createElement("p");
      savingsP.classList.add('savingsP')
      savingsP.textContent = `SALE : ${Math.floor(element.savings)} %`;
      //ფასების div
      let priceDiv = document.createElement('div')
      priceDiv.classList.add('priceDiv')
      //ხაზი
      let linediv = document.createElement('div');
      linediv.classList.add('lineDiv')
      //თამაშის ფასები
      let priceP = document.createElement("p");
      priceP.classList.add("priceP");
      priceP.textContent = `${element.normalPrice}`;
      // ფასდაკლება თამაშზე
      let salePriceP = document.createElement("p");
      salePriceP.classList.add('salepriceP')
      salePriceP.textContent = `${element.salePrice}`;

      // სათაურების და ფასების appendchild
      divWrapper.appendChild(imagethumb);
      priceDiv.appendChild(priceP);
      priceDiv.appendChild(salePriceP);
      priceP.appendChild(linediv);
      divWrapper.appendChild(contentGameP);
      divWrapper.appendChild(priceDiv)
      contentGameP.appendChild(titleP);
      contentGameP.appendChild(dealRatingP);
      contentGameP.appendChild(savingsP);
      document.body.appendChild(divWrapper);
      mainDiv.appendChild(divWrapper)
    });
    console.log(data);

    let normalPrice = document.createElement("p");
    document.getElementById("name").appendChild(normalPrice);
    normalPrice.textContent = data[0].normalPrice;
  } catch (error) {
    console.log("rejected");
  }
}
asyncfunction();


let burger = document.getElementById('game')
burger