import { signUpAction, signInWithGoogleAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function SignUp(props: { searchParams: any }) {
  const searchParams = await props.searchParams;
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-6rem)] h-auto w-full bg-black'>
      <div id='blue-background-holder' style={{ backgroundColor: "#070F2B" }} className='flex flex-col py-8 px-12 rounded-xl w-[50%] min-w-[600px] mx-4'>
        <div className='border-b border-gray-600 pb-4'>
          <h1 className='text-4xl font-semibold text-blue-400'>Sign Up</h1>
          <p className='text-gray-400 mt-2 text-sm'>
            Already have an account?{" "}
            <Link className='text-blue-400 hover:text-blue-300 transition-colors' href='/sign-in'>
              Sign in
            </Link>
          </p>
        </div>

        <div className='flex flex-col gap-6 mt-8'>
          <form>
            <div className='grid grid-cols-2 gap-6'>
              {/* Left Column - Personal Info */}
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName' className='text-lg font-medium text-blue-300'>
                    First Name
                  </Label>
                  <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] rounded-xl hover:border-blue-700 transition-colors'>
                    <Input
                      name='firstName'
                      placeholder='John'
                      required
                      className='bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email' className='text-lg font-medium text-blue-300'>
                    Email
                  </Label>
                  <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] rounded-xl hover:border-blue-700 transition-colors'>
                    <Input
                      name='email'
                      type='email'
                      placeholder='you@example.com'
                      required
                      className='bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Password Fields */}
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='password' className='text-lg font-medium text-blue-300'>
                    Password
                  </Label>
                  <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] rounded-xl hover:border-blue-700 transition-colors'>
                    <Input
                      type='password'
                      name='password'
                      placeholder='Create a password'
                      required
                      className='bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword' className='text-lg font-medium text-blue-300'>
                    Confirm Password
                  </Label>
                  <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] rounded-xl hover:border-blue-700 transition-colors'>
                    <Input
                      type='password'
                      name='confirmPassword'
                      placeholder='Confirm your password'
                      required
                      className='bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </div>
                </div>
              </div>
            </div>
            <SubmitButton
              pendingText='Creating Account...'
              formAction={signUpAction}
              className='bg-blue-600 px-8 transition-all hover:bg-blue-500 py-3 rounded-lg w-full font-medium mt-2'>
              Create Account
            </SubmitButton>
          </form>

          
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-600'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-[#070F2B] px-4 text-gray-400'>Or continue with</span>
            </div>
          </div>

          <form>
            <div className='flex flex-row gap-3'>
              <SubmitButton
                formAction={signInWithGoogleAction}
                pendingText='Continuing with Google...'
                formNoValidate
                className='bg-gray-700 px-8 transition-all hover:bg-gray-600 py-3 rounded-lg w-full font-medium'>
                Google
              </SubmitButton>
            </div>
          </form>
          
          <FormMessage message={{ message: searchParams.message || "" }} />
        </div>
      </div>
    </div>
  );
}
