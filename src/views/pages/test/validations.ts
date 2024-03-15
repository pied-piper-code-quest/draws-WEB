import * as Yup from 'yup';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const LOGIN_INITIAL_VALUES: LoginFormValues = {
  email: '',
  password: '',
}

export const LOGIN_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Correo electrónico incorrecto').required('Requerido'),
  password: Yup.string().required('Requerido'),
});