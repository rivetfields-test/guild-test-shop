// Prices are whole cents, so totals never pick up floating-point errors.
export const SHIPPING_CENTS = 500;
export const FREE_SHIPPING_FROM_CENTS = 5000;
export const COUPONS = { SAVE10: 10 };

export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

export function shipping(subtotalCents) {
  if (subtotalCents === 0) return 0;
  return subtotalCents >= FREE_SHIPPING_FROM_CENTS ? 0 : SHIPPING_CENTS;
}

// KIG-5: the cart says how far the order is from free shipping.
export function shippingNote(subtotalCents) {
  return subtotalCents >= FREE_SHIPPING_FROM_CENTS
    ? 'You get free shipping'
    : `Free shipping on orders over ${formatCents(FREE_SHIPPING_FROM_CENTS).replace('.00', '')}`;
}

export function discount(subtotalCents, code) {
  if (!Object.hasOwn(COUPONS, code)) return 0;
  return Math.round((subtotalCents * COUPONS[code]) / 100);
}

export function total(items, code) {
  const sub = subtotal(items);
  return sub - discount(sub, code) + shipping(sub);
}

export function formatCents(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
