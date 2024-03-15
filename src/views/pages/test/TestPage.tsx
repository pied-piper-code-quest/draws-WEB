import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Button, Input } from 'react-daisyui';
import { Formik } from 'formik';
import { LOGIN_INITIAL_VALUES, LOGIN_VALIDATION_SCHEMA, LoginFormValues } from './validations';
import { useAuthStore } from '../../../stores';


const TestPage: FC = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);
  const loginUserWithDiscord = useAuthStore((state) => state.loginUserWithDiscord);

  const handleSubmit = async (values: LoginFormValues) => {
    const { email, password } = values;
    try {
      await loginUser(email, password);
      navigate('dashboard');
    }
    catch (err) {
      console.log('No se pudo autenticar', err)
    }
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg my-auto">
        <Formik
          initialValues={LOGIN_INITIAL_VALUES}
          // validateOnChange={false}
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
            <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
              <p className="text-center text-lg font-medium">Login</p>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="E-mail"
                    id="email"
                    name="email"
                    className="w-full"
                    value={values.email}
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
                    className="w-full"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Log In
              </Button>
              <Button className="w-full" onClick={loginUserWithDiscord}>
                Log In with Discord
              </Button>

              <p className="text-center text-sm text-gray-500">
                No account?
                <a className="underline" href="#">Sign up</a>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TestPage;