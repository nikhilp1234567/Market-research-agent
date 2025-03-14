import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Record<string, string> }) {
  const searchParams = await props.searchParams;
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] w-full border-t'>
      <form className='flex flex-col bg-blue-900 py-6 px-8 rounded-md w-[30%] mx-4'>
        <h1 className='text-2xl font-medium'>Sign in</h1>
        <br />
        <p className='text-sm text-foreground'>
          Don't have an account? <br />
          <Link className='text-foreground font-medium underline' href='/sign-up'>
            Sign up
          </Link>
        </p>
        <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='you@example.com' required />
          <div className='flex justify-between items-center'>
            <Label htmlFor='password'>Password</Label>
            <Link className='text-xs text-foreground underline' href='/forgot-password'>
              Forgot Password?
            </Link>
          </div>
          <Input type='password' name='password' placeholder='Your password' required />
          <SubmitButton pendingText='Signing In...' formAction={signInAction}>
            Sign in
          </SubmitButton>
          <FormMessage message={{ message: searchParams.message || "" }} />
        </div>
      </form>
    </div>
  );
}
