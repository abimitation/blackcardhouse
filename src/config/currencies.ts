export const currencies = {
  EUR: {
    symbol: "€",
    rate: 1,
    locale: "tr-TR",
  },
  USD: {
    symbol: "$",
    rate: 1.1,
    locale: "en-US",
  },
} as const;

export const currencyKeys = Object.keys(currencies) as Array<keyof typeof currencies>;
export type Currency = keyof typeof currencies;
