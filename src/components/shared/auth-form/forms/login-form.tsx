import { Button } from '@root/components/ui/button';
import { Mail } from 'lucide-react';
import React from 'react';

interface Props {
  setType: React.Dispatch<React.SetStateAction<'login' | 'email' | 'register'>>;
}

export const LoginForm: React.FC<Props> = ({ setType }) => {
  return (
    <div className='flex w-[80%] flex-col gap-4'>
      <p className='text-center text-xl font-bold'>Вход</p>

      <Button
        variant='blue'
        onClick={() => setType('email')}
        type='button'
        className='bg-secondary flex cursor-pointer items-center gap-2 text-sm font-bold'
      >
        <Mail size={24} />
        Войти по E-Mail
      </Button>
    </div>
  );
};
