import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: { searchParams: Record<string, string> }) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className='w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4'>
        <FormMessage message={{ message: searchParams.message || "" }} />
      </div>
    );
  }

  return (
    <div className='flex items-center flex-col justify-center min-h-[calc(100vh-4rem)] w-full border-t'>
      <form className='flex flex-col bg-blue-900 py-6 px-8 rounded-md w-[30%] mx-4'>
        <h1 className='text-2xl font-medium'>Sign up</h1>
        <br />
        <p className='text-sm text text-foreground'>
          Already have an account? <br />
          <Link className='text-primary font-medium underline' href='/sign-in'>
            Sign in
          </Link>
        </p>
        <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='you@example.com' required />
          <Label htmlFor='password'>Password</Label>
          <Input type='password' name='password' placeholder='Your password' minLength={6} required />
          <SubmitButton formAction={signUpAction} pendingText='Signing up...'>
            Sign up
          </SubmitButton>
          <FormMessage message={{ message: searchParams.message || "" }} />
        </div>
      </form>
    </div>
  );
}
