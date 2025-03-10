import { NextPage } from 'next';
import {CheckoutForm}  from '@/my-components/CheckoutForm';

const CheckoutPage: NextPage = () => {
  return (
      <div className="max-w-2xl mx-auto p-4 bg-black">
        <h1 className='text-2xl font-bold mb-4'>Stripe Checkout</h1>
        <p>Testing Stripe Checkout</p>
        <CheckoutForm />
      </div>
    
  );
};

export default CheckoutPage;