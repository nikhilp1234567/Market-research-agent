//this is the landing page after auth

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FeedbackForm from "../../components/my-components/FeedbackForm";
import { useState } from "react";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-[calc(100vh-160px)]'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold text-white mb-6'>Get Feedback In Seconds, Not Months</h1>

        <FeedbackForm />
      </div>
    </div>
  );
}
