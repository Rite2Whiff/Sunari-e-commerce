
const navigation = document.querySelector(".navbar");


document.addEventListener("click", (e) => {
    const isMenuButton = e.target.matches("#menu-icon");
    if (isMenuButton && e.target.closest("header")) {
        navigation.classList.toggle("open");
    }
    else
        navigation.classList.remove("open");
})



document.addEventListener("mouseover", (e) => {
    const isDropdownLink = e.target.matches("[data-dropdown-button]");
    if (!isDropdownLink && e.target.closest("[data-dropdown]") != null) return;

    let currentDropdown
    if (isDropdownLink) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle("active");
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove("active");
    })
})

const cartBox = document.querySelector(".cart");
const cartIcon = document.querySelector(".cart-icon");
cartIcon.addEventListener("click", function () {
    cartBox.classList.toggle("active")
})

function shopItemsAdded() {

}



const cartCloseButton = document.querySelector(".cart-close");
cartCloseButton.addEventListener("click", function () {
    cartBox.classList.remove("active")
})



if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready();
}


function ready() {
    const removeItemButtons = document.querySelectorAll(".cart-remove");
    for (let i = 0; i < removeItemButtons.length; i++) {
        const button = removeItemButtons[i];
        button.addEventListener("click", removeCartItems)
    }

    const inputValues = document.querySelectorAll(".cart-quantity")
    for (let i = 0; i < inputValues.length; i++) {
        const input = inputValues[i];
        input.addEventListener("change", quantityChanged)
    }

    const buyButton = document.querySelector(".btn-buy")
    buyButton.addEventListener("click", buyButtonClicked)
}




function removeCartItems(e) {
    const removeButtonClicked = e.target;
    removeButtonClicked.parentElement.remove();
    updateCartTotal();
}






function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal();
}


const addToCartButtons = document.querySelectorAll(".add-cart")
for (let i = 0; i < addToCartButtons.length; i++) {
    button = addToCartButtons[i];
    button.addEventListener("click", cartButtonClicked);
}

function cartButtonClicked(event) {
    const button = event.target
    const productBox = button.parentElement;
    const title = productBox.querySelector(".product-title").innerText
    const price = productBox.querySelector(".price").innerText
    const img = productBox.querySelector(".product-img").src;
    AddToCart(title, price, img);
    shopItemsAdded();
    updateCartTotal();
}

function shopItemsAdded() {
    const addCartButton = document.querySelectorAll(".cart-icon")
    for (let button of addCartButton) {
        button.classList.add("highlight");
    }
}


function AddToCart(title, price, img) {
    const newBox = document.createElement("div");
    newBox.classList.add(".cart-box");
    const cartContent = document.querySelector(".cart-content");
    const cartItemNames = document.querySelectorAll(".cart-product-title")
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert("This item has already been added to your cart");
            return;
        }
    }
    const cartRowContents = `<div class="cart-box">
    <img src=${img}
        alt="" class="cart-img">
    <div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="bx bxs-trash-alt cart-remove"></i>
</div>`
    newBox.innerHTML = cartRowContents;
    cartContent.append(newBox);
    newBox.querySelector(".cart-remove").addEventListener("click", removeCartItems)
    newBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged)

}

function buyButtonClicked() {
    alert("Your order has been successfully placed")
    const cartItems = document.querySelector(".cart-content")
    cartItems.remove();
    updateCartTotal();

}











function updateCartTotal() {
    const cartRows = document.querySelectorAll(".detail-box");
    const productPrices = document.querySelectorAll(".cart-price");
    const productQuantity = document.querySelectorAll(".cart-quantity");


    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        const productElement = productPrices[i];
        const quantityElement = productQuantity[i];

        const price = parseInt(productElement.innerText.replace("$", ""));
        const quantity = quantityElement.value;
        total = total += (price * quantity);

    }
    document.querySelector(".total-price").innerText = "$" + total;
}