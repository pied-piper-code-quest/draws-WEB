import { FC } from 'react';
import { Button } from 'react-daisyui';

const RootPage: FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button color="primary">Click me!</Button>
      <Button color="secondary">Click me!</Button>
    </div>
  );
};

export default RootPage;