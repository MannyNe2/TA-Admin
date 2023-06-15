export const providerRules = [
  (val) => (val && val.length > 0) || 'Please select a provider',
];

export const originRules = [
  (val) => (val && val.length > 0) || 'Please enter a valid origin',
];

export const destinationRules = [
  (val) => (val && val.length > 0) || 'Please enter a valid destination',
];

export const sideNumberRules = [
  (val) => (val && val.length === 4) || 'Please enter a valid side number',
];

export const licensePlateRules = [
  (val) =>
    (val && val.length > 0 && val.length <= 6) ||
    'Please enter a valid license plate',
];
