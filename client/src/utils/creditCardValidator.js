import cardValidator from 'card-validator';

const validateCreditCard = (cardNumber, expirationDate, cvv) => {
  // Validate card number
  const cardNumberValidation = cardValidator.number(cardNumber);
  if (!cardNumberValidation.isPotentiallyValid || !cardNumberValidation.isValid) {
    throw new Error('Invalid card number');
  }

  // Validate expiration date
  const expirationDateValidation = cardValidator.expirationDate(expirationDate);
  if (!expirationDateValidation.isPotentiallyValid || !expirationDateValidation.isValid) {
    throw new Error('Invalid expiration date');
  }

  // Validate CVV
  const cvvValidation = cardValidator.cvv(cvv);
  if (!cvvValidation.isPotentiallyValid || !cvvValidation.isValid) {
    throw new Error('Invalid CVV')
  }

  return 'Valid credit card';
};

export default validateCreditCard