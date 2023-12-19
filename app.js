const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

//redirect to the product details page
const redirect = (
  bigImg,
  smallimg1,
  smallimg2,
  smallimg3,
  brand,
  productname,
  price
) => {
  const details = {
    bigImg: bigImg,
    smallimg1: smallimg1,
    smallimg2: smallimg2,
    smallimg3: smallimg3,
    brand: brand,
    productname: productname,
    price: price,
  };
  localStorage.setItem("Detail", JSON.stringify(details));
  window.location.href = "./singlePage.html";
};

document.addEventListener("DOMContentLoaded", function () {
  const produtDetails = JSON.parse(localStorage.getItem("Detail"));

  if (produtDetails) {
    const spage = document.getElementById("spage");
    spage.innerHTML = `<div class="image">
            <img src=${produtDetails.bigImg} alt="" id="mainImg" class="mainImg">
            <div id="smallImage">
                <div class="small-image">
                    <img class="sImg" src=${produtDetails.smallimg1} width="100%" alt="">
                </div>
                <div class="small-image">
                    <img class="sImg" src=${produtDetails.smallimg2} width="100%" alt="">
                </div>
                <div class="small-image">
                    <img class="sImg" src=${produtDetails.smallimg3} width="100%" alt="">
                </div>
            </div>
        </div>
        <div class="productDetails">
            <h4>${produtDetails.brand}</h4>
            <h3>${produtDetails.productname}</h3>
            <h6>Rs. ${produtDetails.price}</h6>
            <select name="select size" id="size">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <div class="addTocart">
                <input type="number" max="10" min="1" value="1" id="quantity">
                <button class="cartButton btn" >Add To Cart</button>
            </div>
            <h4 id="details">Product Details :</h4>
            <p>Stylish and comfortable, this shirt, jeans, and shoe ensemble complements a classic watch, creating a versatile and fashionable outfit for any occasion..</p>
        </div>
   `;
  }

  //scripts for changing image in product details page
  var mainImg = document.getElementById("mainImg");
  var smallImg = document.getElementsByClassName("sImg");

  smallImg[0].onclick = function () {
    mainImg.src = smallImg[0].src;
  };
  smallImg[1].onclick = function () {
    mainImg.src = smallImg[1].src;
  };
  smallImg[2].onclick = function () {
    mainImg.src = smallImg[2].src;
  };

  //add to cart function
  const addtocart = () => {
    const produtDetails = JSON.parse(localStorage.getItem("Detail")); //importing data from local storage
    let cartDetails = localStorage.getItem("cart");

    if (cartDetails === null) {
      cartDetails = [];
    } else {
      cartDetails = JSON.parse(cartDetails);
    }

    if (produtDetails) {
      const size = document.getElementById("size").value;
      const quantity = document.getElementById("quantity").value;
      const productToAddInCart = {
        bigImg: produtDetails.bigImg,
        productname: produtDetails.productname,
        price: produtDetails.price,
        size: size,
        quantity: quantity,
      };
      cartDetails.push(productToAddInCart);
      console.log(cartDetails);
      localStorage.setItem("cart", JSON.stringify(cartDetails));
      alert("Added to cart");
    }
  };

  const selectCart = document.getElementsByClassName("cartButton");
  selectCart[0].addEventListener("click", addtocart);
});

//chekout page
const addedProducts = localStorage.getItem("cart");
const checkout = document.getElementById("cardItem");
const cartTotal = document.getElementsByClassName("cartAdd");
if (addedProducts === null) {
  checkout.innerHTML = "<div>Cart Empty</div>";
  cartTotal[0].innerHTML = `<h3>Cart Total</h3>
        <table>
          <tr>
            <td>Cart Subtotal</td>
            <td>Rs. 0</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>free</td>
          </tr>
          <tr>
            <td><strong>Total Amount</strong></td>
            <td><strong>0</strong></td>
          </tr>
        </table>
        <button id="cartButton" disabled >Place Order</button>`;
} else {
  const data = JSON.parse(addedProducts);
  checkout.innerHTML = data.map((item, index) => {
    return ` <tr>
            <td><img src=${item.bigImg}></img></td>
            <td>${item.productname}</td>
            <td>${item.quantity}</td>
            <td>${item.size}</td>
            <td>${item.price}</td>
            <td>${item.price * item.quantity}</td>
            <td style="cursor: pointer" id="remove" onclick="remove(${index})"><i class="far fa-times-circle"></i></td>
          </tr>`;
  });

  const totalAmount = data.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  cartTotal[0].innerHTML = `<h3>Cart Total</h3>
        <table>
          <tr>
            <td>Cart Subtotal</td>
            <td>Rs. ${totalAmount}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>free</td>
          </tr>
          <tr>
            <td><strong>Total Amount</strong></td>
            <td><strong>${totalAmount}</strong></td>
          </tr>
        </table>
        <button id="cartButton" onclick="placeorder()">Place Order</button>`;
}

const remove = (index) => {
  const data = JSON.parse(addedProducts);
  data.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(data));
  window.location.reload();
};

const placeorder = () => {
  localStorage.clear();
  alert("Order Placed");
  window.location.href = "/index.html";
};
