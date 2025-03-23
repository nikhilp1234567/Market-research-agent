import { signInAction, signInWithGoogleAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: any }) {
  const searchParams = await props.searchParams;
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-6rem)] h-auto w-full bg-black'>
      <div id='blue-background-holder' style={{ backgroundColor: "#070F2B" }} className='flex flex-col py-8 px-12 rounded-xl w-[35%] min-w-[400px] mx-4'>
        <div className='border-b border-gray-600 pb-4'>
          <h1 className='text-4xl font-semibold text-blue-400'>Sign In</h1>
          <p className='text-gray-400 mt-2 text-sm'>
            Don't have an account?{" "}
            <Link className='text-blue-400 hover:text-blue-300 transition-colors' href='/sign-up'>
              Sign up
            </Link>
          </p>
        </div>

        <form className='flex flex-col gap-6 mt-8'>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-lg font-medium text-blue-300'>
              Email
            </Label>
            <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] rounded-xl hover:border-blue-700 transition-colors'>
              <Input
                name='email'
                placeholder='you@example.com'
                required
                className='bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Label htmlFor='password' className='text-lg font-medium text-blue-300'>
                Password
              </Label>
              <Link className='text-sm text-blue-400 hover:text-blue-300 transition-colors' href='/forgot-password'>
                Forgot Password?
              </Link>
            </div>
            <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] rounded-xl hover:border-blue-700 transition-colors'>
              <Input
                type='password'
                name='password'
                placeholder='Your password'
                required
                className='bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
              />
            </div>
          </div>

          <SubmitButton
            pendingText='Signing In...'
            formAction={signInAction}
            className='bg-blue-600 px-8 transition-all hover:bg-blue-500 py-3 rounded-lg w-full font-medium'>
            Sign in
          </SubmitButton>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-600'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-[#070F2B] px-4 text-gray-400'>Or continue with</span>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <SubmitButton
              formAction={signInWithGoogleAction}
              pendingText='Continuing with Google...'
              formNoValidate
              className='bg-gray-700 px-8 transition-all hover:bg-gray-600 py-3 rounded-lg w-full font-medium'>
              Google
            </SubmitButton>
          </div>
          <FormMessage message={{ message: searchParams.message || "" }} />
        </form>
      </div>
    </div>
  );
}
