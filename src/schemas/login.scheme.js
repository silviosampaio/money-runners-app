import * as yup from 'yup';

let LoginScheme = yup.object().shape({
  email: yup.string().email().required('Digite um e-mail válido'),
  password: yup
    .string()
    .min(5, 'A senha deve conter no mínimo 5 caracteres')
    .required('Senha é obrigatório'),
});

export default LoginScheme;
