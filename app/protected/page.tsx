//this is the landing page after auth

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NewForm from "@/my-components/NewForm";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className='flex flex-col justify-center w-full items-center min-h-screen bg-black mt-32 pt-8 pb-6 pl-6 pr-6'>
      <NewForm />
    </div>
  );
}
