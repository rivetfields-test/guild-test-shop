import { discount, formatCents, shipping, shippingNote, subtotal, total } from './cart.js';

const products = [
  { id: 'mug', name: 'Enamel mug', priceCents: 1800 },
  { id: 'tote', name: 'Canvas tote', priceCents: 2400 },
  { id: 'notebook', name: 'Grid notebook', priceCents: 1200 },
];
const cart = [];
let appliedCode = '';

document.querySelector('#coupon').addEventListener('submit', (event) => {
  event.preventDefault();
  appliedCode = new FormData(event.currentTarget).get('code').trim().toUpperCase();
  render();
});

function render() {
  document.querySelector('#products').replaceChildren(...products.map((product) => {
    const button = document.createElement('button');
    button.textContent = `Add ${product.name} (${formatCents(product.priceCents)})`;
    button.addEventListener('click', () => {
      const line = cart.find((item) => item.id === product.id);
      if (line) line.quantity += 1;
      else cart.push({ ...product, quantity: 1 });
      render();
    });
    return button;
  }));
  document.querySelector('#lines').replaceChildren(...cart.map((item) => {
    const row = document.createElement('li');
    row.textContent = `${item.quantity} x ${item.name}`;
    return row;
  }));
  const sub = subtotal(cart);
  document.querySelector('#subtotal').textContent = formatCents(sub);
  document.querySelector('#discount').textContent = formatCents(discount(sub, appliedCode));
  document.querySelector('#shipping').textContent = formatCents(shipping(sub));
  document.querySelector('#total').textContent = formatCents(total(cart, appliedCode));
  document.querySelector('#shipping-note').textContent = shippingNote(sub);
}

render();
