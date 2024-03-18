import * as Yup from "yup";

export interface LoginFormValues {
  username: string;
  password: string;
}

export const LOGIN_INITIAL_VALUES: LoginFormValues = {
  username: "",
  password: "",
};

export const LOGIN_VALIDATION_SCHEMA = Yup.object().shape({
  username: Yup.string().required("Requerido"),
  password: Yup.string().required("Requerido"),
});
