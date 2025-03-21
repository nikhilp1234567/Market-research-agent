import React from "react";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { CheckoutForm } from "./CheckoutForm";

export default function Nav() {
  return (
    <nav id='main-navigation' className='w-full bg-gray-900 flex justify-center items-center shadow-lg sticky py-4 top-0 z-50 h-20 border-b border-gray-700'>
      <div className='w-full max-w-7xl flex justify-between items-center'>
        <div id='nav-left' className='flex gap-8 items-center'>
          <Link href={"/"} id='home-link' className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
            <img src='/icon.ico' alt='MarketMind Logo' className='h-10 w-10' />
            <h1 className='text-2xl font-bold text-white tracking-tight'>
              <span className='text-blue-400'>Market</span>
              <span className='text-white'>Mind</span>
            </h1>
          </Link>
          <div className='bg-black border px-4 py-2 rounded-md hover:bg-gray-600 transition-colors'>
            <CheckoutForm />
          </div>
        </div>
        <div id='nav-right'>{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}</div>
      </div>
    </nav>
  );
}
