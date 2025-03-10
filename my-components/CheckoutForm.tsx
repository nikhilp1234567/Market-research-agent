'use client'

import { FormEvent } from "react"
import { getStripe } from "@/utils/get-stripe"

export const CheckoutForm = () => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const checkoutSession = await response.json();

      if (checkoutSession.statusCode === 500) {
        console.error(checkoutSession.message);
        return;
      }

      const stripe = await getStripe();
      const {error} = await stripe!.redirectToCheckout({ sessionId: checkoutSession.sessionId });
      if (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Checkout</button>
    </form>
  );
}