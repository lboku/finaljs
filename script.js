let mainDiv = document.getElementById("game");
let gamesLi = document.querySelector("nav ul li:nth-child(3)");
let myStorefull = document.getElementById("mystore-div");
let inerdiv = document.getElementById("iner-store-div");
let domtrailer = document.getElementById("play-trailer");
let trailerContainer = document.getElementById("trailer-for-dom");
let iframe = null;
if (trailerContainer) {
  iframe = trailerContainer.querySelector("iframe");
}

let arrayForShop = [];
let isAddedArray = [];
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

      let divForplusminus = document.createElement("div");
      divForplusminus.classList.add("divForplusminus");

      let imgPlus = document.createElement("img");
      imgPlus.src = "image/plus.svg";
      imgPlus.classList.add("imgPlus");

      let imgminus = document.createElement("img");
      imgminus.src = "image/minus.svg";
      imgminus.classList.add("imgminus");

      divForplusminus.appendChild(imgPlus);
      divForplusminus.appendChild(imgminus);

      isAddedArray[index] = false;

      divForplusminus.addEventListener("click", function () {
        imgPlus.classList.toggle("showplus");
        imgminus.classList.toggle("showminus");

        if (!isAddedArray[index]) {
          let shopItem = document.createElement("div");
          shopItem.classList.add("shop-item");

          let img = document.createElement("img");
          img.classList.add("imagethumb");
          img.src = element.thumb;
          shopItem.appendChild(img);

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
          removeBtn.classList.add("removeButton");

          removeBtn.addEventListener("click", function () {
            imgPlus.classList.remove("showplus");
            imgminus.classList.remove("showminus");
            shopItem.remove();

            arrayForShop[index] = null;
            isAddedArray[index] = false;
          });
          shopItem.appendChild(removeBtn);

          // append-ში მხოლოდ shopItem
          inerdiv.appendChild(shopItem);
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
let topBtn = document.getElementById("top");
if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

let openStoreDiv = document.getElementById("store-div");
openStoreDiv.addEventListener("click", function () {
  myStorefull.classList.toggle("div-for-store-show");
});

let acordion = document.getElementById("assetto-accordion");
let assettoDiv = document.getElementById("image-assetto");

if (acordion && assettoDiv) {
  acordion.addEventListener("click", function () {
    assettoDiv.classList.toggle("show-image");
  });
}

if (acordion) {
  acordion.addEventListener("click", function () {
    acordion.classList.toggle("accordion-show");
  });
}

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

if (mainDiv) {
  let closeMystoreDiv = document.getElementById("game");
  closeMystoreDiv.addEventListener("click", function () {
    if (myStorefull.classList.contains("div-for-store-show")) {
      myStorefull.classList.remove("div-for-store-show");
    }
  });
}
let send = document.getElementById("form-element");
let formElement = document.getElementById("buy");
let buyAll = document.getElementById("buy-all");

let cookiesSave = document.getElementById("cookie");
let acceptBatton = document.getElementById("accept");
let rejectBatton = document.getElementById("reject");

acceptBatton.addEventListener("click", function (e) {
  e.preventDefault();
  Cookies.set("", isAddedArray);
  cookiesSave.classList.add("hidecookies");
});
rejectBatton.addEventListener("click", function () {
  Cookies.remove("", isAddedArray);
  cookiesSave.classList.add("hidecookies");
});

buyAll.addEventListener("click", function () {
  formElement.classList.toggle("show-sector");
});
send.addEventListener("submit", function (e) {
  e.preventDefault();
  let errors = {};

  let userName = document.getElementById("usernamefield").value;
  if (userName === "") {
    errors.username = "please enter your name";
  }
  let password = document.getElementById("passwordfield").value;
  if (password === "") {
    errors.password = "please enter your password";
  }
  let password2 = document.getElementById("passwordfield2").value;
  if (password2 === "") {
    errors.password2 = "repeat your password";
  }
  if (password2 !== password) {
    errors.password2 = "The passwords you entered do not match.";
  }
  let emailValue = document.getElementById("emailfield").value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailValue === "") {
    errors.email = "please enter your email";
  } else if (!emailPattern.test(emailValue)) {
    errors.email = "format for email is wrong";
  }

  let gender = false;
  let radios = this.querySelectorAll(".genderfield");
  radios.forEach((element) => {
    if (element.checked) gender = true;
  });
  if (!gender) {
    errors.gender = "Please indicate gender.";
  }
  let agree = document.getElementById("check").checked;
  if (!agree) {
    errors.agree = "Please agree to the terms and conditions.";
  }
  this.querySelectorAll(".error-text").forEach((element) => {
    element.innerHTML = "";
  });

  for (let key in errors) {
    let errorText = document.getElementById("error-" + key);
    console.log(errorText);
    if (errorText) {
      errorText.innerText = errors[key];
    }
  }
  if (Object.keys(errors).length === 0) {
    this.submit().addEventListener("click", function () {
      myStorefull.classList.remove("div-for-store-show");
    });
  }
});
let passwordfield = document.getElementById("passwordfield");
let passwordfield2 = document.getElementById("passwordfield2");
let toggleIcon = document.getElementById("toggleIcon");
let toggleIcon2 = document.getElementById("toggleIcon2");
toggleIcon.addEventListener("click", function () {
  if (passwordfield.type === "password") {
    passwordfield.setAttribute("type", "text");
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordfield.setAttribute("type", "password");
    toggleIcon.classList.add("fa-eye");
    toggleIcon.classList.remove("fa-eye-slash");
  }
});
toggleIcon2.addEventListener("click", function () {
  if (passwordfield2.type === "password") {
    passwordfield2.setAttribute("type", "text");
    toggleIcon2.classList.remove("fa-eye");
    toggleIcon2.classList.add("fa-eye-slash");
  } else {
    passwordfield2.setAttribute("type", "password");
    toggleIcon2.classList.add("fa-eye");
    toggleIcon2.classList.remove("fa-eye-slash");
  }
});
let emailField = document.getElementById("emailfield");
let errorTextEmail = document.getElementById("error-email");

emailField.addEventListener("keyup", function () {
  let emailValue = emailField.value.trim();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailValue === "") {
    errorTextEmail.innerText = "enter your email";
    errorTextEmail.style.color = "red";
  } else if (emailPattern.test(emailValue)) {
    errorTextEmail.innerText = "email valid";
    errorTextEmail.style.color = "green";
  } else {
    errorTextEmail.innerText = "email isn't valid";
  }
});
let usernameField = document.getElementById("usernamefield");
let usernamePattern = /^[A-Za-z0-9_]{3,16}$/;
usernameField.addEventListener("keyup", function () {
  let usernameValue = usernameField.value.trim();

  if (!usernamePattern.test(usernameValue)) {
    document.getElementById("error-username").textContent =
      "Username must be 3-16 characters and contain only letters, numbers, or underscores.";
  } else {
    document.getElementById("error-username").textContent = "";
  }
  let passwordField = document.getElementById("passwordfield");
  let confirmPasswordField = document.getElementById("passwordfield2");
  let errorPassword = document.getElementById("error-password");
  let errorPassword2 = document.getElementById("error-password2");

  let passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  // პაროლის ვალიდაცია
  passwordField.addEventListener("keyup", function () {
    let passwordValue = passwordField.value.trim();

    if (!passwordPattern.test(passwordValue)) {
      errorPassword.textContent =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
      errorPassword.style.color = "red";
    } else {
      errorPassword.textContent = "Password valid";
      errorPassword.style.color = "green";
    }

    // პაროლების დამთხვევის შემოწმება
    validateConfirmPassword();
  });

  // განმეორებითი პაროლის ვალიდაცია
  confirmPasswordField.addEventListener("keyup", validateConfirmPassword);

  function validateConfirmPassword() {
    let passwordValue = passwordField.value.trim();
    let confirmValue = confirmPasswordField.value.trim();

    if (confirmValue === "") {
      errorPassword2.textContent = "";
      return;
    }

    if (passwordValue !== confirmValue) {
      errorPassword2.textContent = "Passwords do not match";
      errorPassword2.style.color = "red";
    } else {
      errorPassword2.textContent = "Passwords match";
      errorPassword2.style.color = "green";
    }
  }
});
