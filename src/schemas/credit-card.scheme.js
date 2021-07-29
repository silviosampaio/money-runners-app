import * as yup from 'yup';
import valid from 'card-validator';

let CreditCardSchema = yup.object().shape({
  card_number: yup
    .string()
    .test(
      'credit-card-number',
      'Número de cartão de crédito inválido',
      (cc_number) => valid.number(cc_number).isValid
    )
    .required('Número de cartão de crédito é obrigatório'),
  card_cvv: yup
    .string()
    .min(3, 'O CVV/CVC precisa ser maior que 3.')
    .required('Digite um CVV/CVC válido'),
  card_expiration_date: yup
    .string()
    .length(4, 'A data de expiração precisa ser no formato MM/YY.')
    .required('Digite uma data de expiração válida'),
  card_holder_name: yup
    .string()
    .min(5, 'O Nome no Cartão precisa ser maior que 5.')
    .required('Digite um Nome no Cartão válido'),
});

export default CreditCardSchema;
