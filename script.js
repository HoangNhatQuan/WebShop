const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
if (bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if (close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


// Shopping Cart



if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else{
    ready();
}

function ready(){
    var removeCartItemsButton = document.getElementsByClassName('cart-close');
    for(var i = 0; i < removeCartItemsButton.length; i++){
        var button = removeCartItemsButton[i];
        button.addEventListener('click', removeCartItems);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChange);
    }
    var addToCartButtons = document.getElementsByClassName('cart-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked)
    }
}
function removeCartItems(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChange(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imgSrc = shopItem.querySelector('#MainImg').src;
    console.log(title,price,imgSrc);
    addItemToCart(title,price,imgSrc);
}
function addItemToCart(title,price,imgSrc) {
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    var cartItems = document.querySelectorAll('tbody')[0];
    var cartRowContents = `
    <td><img class="cart-item cart-item-img" src="img/products/f1.jpg" alt=""></td>
    <td class="cart-item cart-item-title">Cartoon Astronaut T-Shirts </td>
    <td class="cart-item cart-item-price">$77.99</td>
    <td><input class="cart-quantity cart-quantity-input" type="number" value="1"></td>
    <td class="cart-price">$77.99</td>
    <td><i class="cart-quantity cart-close far fa-times-circle"></i></td>
    `;
    cartRow.innerHTML = cartRowContents;
    console.log(cartRow.innerHTML);
}



function updateCartTotal() {
    var cartItemContainer = document.querySelectorAll('tbody')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-item-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerHTML.replace('$',''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerHTML = '$' + total;
    document.getElementsByClassName('cart-total-price')[1].innerHTML = '$' + total;
}
