import {cart, 
  removeFromCart, 
  calculateCartQuantity, 
  updateQuantity, 
  updateDeliveryOption
} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, 
  getDeliveryOption,
  calculateDeliveryDate} from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary() {
  updateCartQuantity();
  let cartSummaryHTML = '';

  cart.forEach((cartItem)=>{
    let productId = cartItem.productId;

    let matchingProduct = getProduct(productId);  

    let deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    let dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
    <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-price">
          ${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
              Update
            </span>
            <input class="quantity-input">
            <span class = "save-quantity-link link-primary js-save-link" data-product-id=${matchingProduct.id}>Save</span>
            <span class="delete-quantity-link link-primary 
            js-delete-link-${matchingProduct.id} js-delete-link" data-product-id=${matchingProduct.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption)=> {
      let dateString = calculateDeliveryDate(deliveryOption);

      let priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    return html;
  }


  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click',() => {
        let {productId} = link.dataset;
        removeFromCart(productId);

        let container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.remove();

        updateCartQuantity();

        renderPaymentSummary();
      });
  });

  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click',() => {
        let {productId} = link.dataset;
        
        document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
      });
  });

  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        let {productId} = link.dataset;

        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

        let newQuantity = Number(document.querySelector('.quantity-input').value);

        updateQuantity(productId, newQuantity);

        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

        updateCartQuantity();

        renderPaymentSummary();
      });
  });


  function updateCartQuantity() {
    let returnToHomeLink = document.querySelector('.js-return-to-home-link');
    if (returnToHomeLink) {
      returnToHomeLink.innerHTML = `${calculateCartQuantity()} items`;
    }
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        let {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
  });
}
