import { signInAction, signInWithGoogleAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

<<<<<<< HEAD
export default async function Login(props: {
  searchParams: Promise<Message>;
}) {
=======
export default async function Login(props: { searchParams: any }) {
>>>>>>> 2ce96e54671ed38272d384ee0eb54e778babfa28
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
          <div className='relative my-4'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-blue-900 px-2 text-gray-300'>Or continue with</span>
            </div>
          </div>
          <SubmitButton formAction={signInWithGoogleAction} pendingText='Continuing with Google...' formNoValidate>
            Log in with Google
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
