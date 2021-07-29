import * as yup from 'yup';
import { validate } from 'gerador-validador-cpf';

let InviteSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'O nome deve conter no mínimo 5 caracteres')
    .required(),
  email: yup.string().email().required('Digite um e-mail válido'),
  photo: yup.object().required('Selecione uma foto'),
  cpf: yup
    .string()
    .test({
      name: 'cpf_validation',
      message: 'Digite um CPF válido',
      test: (cpf) => validate(cpf),
    })
    .required('Digite seu CPF'),
  phone: yup
    .string()
    .min(14, 'Digite um telefone válido')
    .required('Digite seu Telefone'),
  birthday: yup
    .string()
    .min(10, 'Digite uma data de nascimento válida')
    .required('Digite sua data de nascimento'),
  password: yup
    .string()
    .min(5, 'A senha deve conter no mínimo 5 caracteres')
    .required('Senha é obrigatório'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais.'),
});

export default InviteSchema;
