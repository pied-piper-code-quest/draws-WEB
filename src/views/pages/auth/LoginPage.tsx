import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Input } from 'react-daisyui';
import { Formik } from 'formik';
import { useAuthStore } from '../../../stores';
import { AuthService } from '../../../services/auth.service';
import Wink from '../../assets/wink.png';
import { LOGIN_INITIAL_VALUES, LOGIN_VALIDATION_SCHEMA, LoginFormValues } from './validations';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);

  const handleSubmit = async (values: LoginFormValues) => {
    const { username, password } = values;
    try {
      await loginUser(username, password);
      navigate('/dashboard');
    }
    catch (err) {
      console.log('No se pudo autenticar', err)
    }
  }

  const handleLoginWithDiscord = async () => {
    try {
      const { url } = await AuthService.loginWithDiscord();
      if (url) window.location.assign(url);
    }
    catch (err) {
      console.log('No se pudo autenticar', err)
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-3">Aplicación de Sorteos</h1>
      <img src={Wink} width={150} height={150} />
      <div className="w-12/12 md:w-3/12 bg-white rounded-xl">
        <Formik
          initialValues={LOGIN_INITIAL_VALUES}
          validationSchema={LOGIN_VALIDATION_SCHEMA}
          enableReinitialize
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            values,
            // errors,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
              <p className="text-center text-2xl text-black font-semibold">Iniciar Sesion</p>
              <Button
                type="button"
                className="w-full bg-[#5865F2] border-[#5865F2] hover:bg-[#3d46a9] hover:border-[#3d46a9] text-white font-base"
                onClick={handleLoginWithDiscord}
                startIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 56 52" fill="none">
                    <path d="M47.0461 11.4036C43.5144 9.85104 39.7381 8.72267 35.7901 8.08023C35.3052 8.90386 34.7388 10.0117 34.3483 10.8929C30.1515 10.2999 25.9932 10.2999 21.8737 10.8929C21.4831 10.0117 20.9038 8.90386 20.4146 8.08023C16.4624 8.72267 12.6818 9.85516 9.15012 11.4118C2.02665 21.5261 0.0955935 31.3891 1.06112 41.1121C5.78578 44.4272 10.3645 46.441 14.8661 47.7588C15.9775 46.3216 16.9688 44.7937 17.8227 43.1835C16.1963 42.6028 14.6386 41.8863 13.1667 41.0544C13.5572 40.7826 13.9391 40.4985 14.3082 40.2061C23.2855 44.1513 33.0395 44.1513 41.9095 40.2061C42.2828 40.4985 42.6647 40.7826 43.0509 41.0544C41.5747 41.8904 40.0127 42.607 38.3864 43.1876C39.2403 44.7937 40.2273 46.3257 41.343 47.7629C45.8488 46.4451 50.4319 44.4313 55.1565 41.1121C56.2894 29.8406 53.2212 20.0682 47.0461 11.4036ZM19.0457 35.1325C16.3508 35.1325 14.1408 32.7687 14.1408 29.8901C14.1408 27.0115 16.3036 24.6435 19.0457 24.6435C21.7878 24.6435 23.9978 27.0073 23.9506 29.8901C23.9549 32.7687 21.7878 35.1325 19.0457 35.1325ZM37.1719 35.1325C34.477 35.1325 32.267 32.7687 32.267 29.8901C32.267 27.0115 34.4298 24.6435 37.1719 24.6435C39.914 24.6435 42.124 27.0073 42.0768 29.8901C42.0768 32.7687 39.914 35.1325 37.1719 35.1325Z" fill="white" />
                  </svg>
                }
              >
                Discord
              </Button>
              <Divider>O inicia sesión con</Divider>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    className="w-full bg-white border-[#8D7CFD] text-[#8D7CFD] focus:border-[#8D7CFD] focus:shadow-sm focus:shadow-[#8D7CFD]"
                    value={values.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    className="w-full bg-white border-[#8D7CFD] text-[#8D7CFD] text=[#8D7CFD] focus:border-[#8D7CFD] focus:shadow-sm focus:shadow-[#8D7CFD]"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#6131D1] border-[#6131D1] hover:bg-[#432292] hover:border-[#432292] text-white">
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