import React from "react";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { CheckoutForm } from "./CheckoutForm";

export default function Nav() {
  return (
    <nav id='main-navigation' className='w-full bg-black flex justify-center items-center shadow-lg h-16'>
      <div className='w-full flex justify-between items-center p-6 px-10 text-s'>
        <div id='nav-left' className='flex gap-5 items-center font-semibold !border-white hover:!border-white duration-500 rounded-md'>
          <Link href={"/"} id='home-link'>
            <h1 className='bg-white text-black px-3 py-2 hover:text-white duration-500  hover:bg-black rounded-md'>MarketMind</h1>
          </Link>
          <div className='bg-white text-black px-3 py-2 hover:text-white duration-500 hover:bg-black rounded-md'>
            <CheckoutForm />
          </div>
        </div>
        <div id='nav-right'>{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}</div>
      </div>
    </nav>
  );
}
