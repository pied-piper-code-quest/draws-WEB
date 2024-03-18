import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Input } from "react-daisyui";
import { Formik } from "formik";
import { ROUTES } from "../../../global";
import { useAuthStore } from "../../../stores";
import { AuthService } from "../../../services/auth.service";
import {
  LOGIN_INITIAL_VALUES,
  LOGIN_VALIDATION_SCHEMA,
  LoginFormValues,
} from "./validations";
import Wink from "../../assets/wink.png";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const setAuthData = useAuthStore(state => state.setAuthData);
  const setIsLoading = useAuthStore(state => state.setIsLoading);
  const isLoading = useAuthStore(state => state.isLoading);

  const handleSubmit = async (values: LoginFormValues) => {
    const { username, password } = values;
    try {
      setIsLoading(true);
      const { token, user } = await AuthService.login(username, password);
      setAuthData({ token, user, userType: "admin" });
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      setAuthData(null);
      console.log("No se pudo autenticar", err);
    }
  };

  const handleLoginWithDiscord = async () => {
    try {
      setIsLoading(true);
      const { url } = await AuthService.getDiscordOAuthUrl();
      if (url) window.location.assign(url);
    } catch (err) {
      console.log("No se pudo autenticar", err);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-3">
        Aplicación de Sorteos
      </h1>
      <img src={Wink} width={150} height={150} />
      <div className="w-12/12 md:w-3/12 bg-white rounded-xl">
        <Formik
          initialValues={LOGIN_INITIAL_VALUES}
          validationSchema={LOGIN_VALIDATION_SCHEMA}
          enableReinitialize
          onSubmit={values => handleSubmit(values)}
        >
          {({
            values,
            // errors,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
              <p className="text-center text-2xl text-black font-semibold">
                Iniciar Sesión
              </p>
              <Button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-700 text-white mb-2 w-full btn-lg text-lg"
                onClick={handleLoginWithDiscord}
                startIcon={<i className="bx bxl-discord-alt bx-lg"></i>}
                disabled={isLoading}
              >
                Discord
              </Button>
              <div className="h-0.5" />
              <Divider>
                <span className="text-gray-300">O Inicia sesión con</span>
              </Divider>
              <div className="h-0.5" />
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <Input
                    className="w-full text-secondary mb-2 border-2 placeholder:text-secondary"
                    color="secondary"
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <Input
                    className="w-full text-secondary mb-2 border-2 placeholder:text-secondary"
                    color="secondary"
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button
                color="primary"
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                INGRESAR
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginPage;
