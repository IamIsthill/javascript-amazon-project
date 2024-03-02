import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { practice } from './practice.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();

practice();