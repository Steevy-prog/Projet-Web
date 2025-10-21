/**
 * Formate un prix en Franc CFA
 * @param price - Le prix à formater
 * @returns Le prix formaté avec le symbole FCFA
 */
export function formatPrice(price: number): string {
  return `${price.toFixed(0)} FCFA`;
}

/**
 * Convertit un prix de EUR à FCFA (taux approximatif: 1 EUR = 655.957 FCFA)
 * @param priceInEur - Le prix en euros
 * @returns Le prix converti en FCFA
 */
export function convertEurToFcfa(priceInEur: number): number {
  const conversionRate = 655.957;
  return Math.round(priceInEur * conversionRate);
}

/**
 * Formate et convertit un prix de EUR à FCFA
 * @param priceInEur - Le prix en euros
 * @returns Le prix formaté en FCFA
 */
export function formatPriceFromEur(priceInEur: number): string {
  const priceInFcfa = convertEurToFcfa(priceInEur);
  return formatPrice(priceInFcfa);
}
