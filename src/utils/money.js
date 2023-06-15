export function formatPrice(price) {
  return Intl.NumberFormat('en-US').format(price);
}
