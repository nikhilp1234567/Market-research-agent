import React from "react";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { CheckoutForm } from "./CheckoutForm";

export default function Nav() {
  return (
    <nav
      id='main-navigation'
      style={{ backgroundColor: "#070F2B" }}
      className='max-w-full flex justify-center items-center sticky py-4 top-0 z-50 h-20 border rounded-lg !m-6 border-gray-700'>
      <div className='w-full max-w-7xl flex justify-between items-center'>
        <div id='nav-left' className='flex gap-8 items-center transition-all duration-300'>
          <Link href={"/"} id='home-link' className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
            <img src='/icon.ico' alt='MarketMind Logo' className='h-10 w-10' />
            <h1 className='text-2xl font-bold text-white tracking-tight'>
              <span className='font-extralight text-blue-800'>Market</span>
              <span className='font-extralight text-white'>Mind</span>
            </h1>
          </Link>
          {/* <CheckoutForm /> */}
        </div>
        <div id='nav-right'>{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}</div>
      </div>
    </nav>
  );
}
