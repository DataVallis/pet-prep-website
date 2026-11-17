// ECB euro reference rates, 13 November 2026: 1 EUR = 0.83559 GBP = 1.1052 USD. Fixed on purpose.
// PDSA (UK) amounts are GBP internally; the app and the page show EUR (default) or USD, converted with these
// rates and marked "~". GBP is never offered as a display currency (David 2026-11-17).
export const RATES = { GBP: 1, EUR: 1 / 0.83559, USD: 1.1052 / 0.83559 };
export const SYMBOL = { GBP: '£', EUR: '€', USD: '$' };
