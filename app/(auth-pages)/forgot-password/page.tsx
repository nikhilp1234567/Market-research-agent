import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] h-auto w-full bg-black'>
      <div id='blue-background-holder' style={{ backgroundColor: "#070F2B" }} className='flex flex-col py-8 px-12 rounded-xl w-[35%] min-w-[400px] mx-4'>
        <div className='border-b border-gray-600 pb-4'>
          <h1 className='text-4xl font-semibold text-blue-400'>Reset Password</h1>
          <p className='text-gray-400 mt-2 text-sm'>
            Remember your password?{" "}
            <Link className='text-blue-400 hover:text-blue-300 transition-colors' href='/sign-in'>
              Sign in
            </Link>
          </p>
        </div>

        <div className='flex flex-col gap-6 mt-8'>
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

          <SubmitButton
            formAction={forgotPasswordAction}
            pendingText='Sending Reset Link...'
            className='bg-blue-600 px-8 transition-all hover:bg-blue-500 py-3 rounded-lg w-full font-medium'>
            Reset Password
          </SubmitButton>

          <FormMessage message={{ message: searchParams.message || "" }} />
        </div>
      </div>
    </div>
  );
}
