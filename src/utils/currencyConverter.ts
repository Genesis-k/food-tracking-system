/**
 * Currency converter utility for the application
 * Converts between USD and KSH (Kenyan Shilling)
 */

// Exchange rate (1 USD to KSH)
// In a production app, this would be fetched from an API
const USD_TO_KSH_RATE = 128.5;

/**
 * Convert USD to KSH
 * @param amountUSD Amount in USD
 * @returns Amount in KSH
 */
export const usdToKsh = (amountUSD: number): number => {
  return amountUSD * USD_TO_KSH_RATE;
};

/**
 * Convert KSH to USD
 * @param amountKSH Amount in KSH
 * @returns Amount in USD
 */
export const kshToUsd = (amountKSH: number): number => {
  return amountKSH / USD_TO_KSH_RATE;
};

/**
 * Format currency based on the specified currency code
 * @param amount Amount to format
 * @param currencyCode Currency code (e.g., 'USD', 'KSH')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currencyCode: string = "USD",
): string => {
  if (currencyCode === "KSH") {
    return `KSh ${amount.toFixed(2)}`;
  }

  return `$${amount.toFixed(2)}`;
};

/**
 * Get the display amount based on the preferred currency
 * @param amountUSD Original amount in USD
 * @param preferredCurrency Preferred currency code ('USD' or 'KSH')
 * @returns Formatted currency string in the preferred currency
 */
export const getDisplayAmount = (
  amountUSD: number,
  preferredCurrency: string = "USD",
): string => {
  if (preferredCurrency === "KSH") {
    return formatCurrency(usdToKsh(amountUSD), "KSH");
  }

  return formatCurrency(amountUSD, "USD");
};
