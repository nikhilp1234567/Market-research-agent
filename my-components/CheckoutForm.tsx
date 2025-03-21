"use client";

import { getStripe } from "@/utils/get-stripe";

export const CheckoutForm = () => {
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const checkoutSession = await response.json();

      if (checkoutSession.statusCode === 500) {
        console.error(checkoutSession.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({ sessionId: checkoutSession.sessionId });
      if (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      className='flex flex-col justify-center items-center bg-black border px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors'
      onClick={handleCheckout}
      type='button'>
      Buy us a coffee!
    </button>
  );
};
