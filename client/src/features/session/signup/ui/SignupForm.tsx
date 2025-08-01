import type z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Label,
  Loader
} from '@/shared/ui'

import { useSignupUser } from '../api/useSignupUser'
import { SignupSchema } from '../model/contract'

type SignupFormData = z.infer<typeof SignupSchema>

export const SignupForm = () => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutate: signup, isPending } = useSignupUser(form.reset)

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card
        className='mx-auto w-full max-w-[572px] rounded-[48px] border-none
          bg-light-gray px-6 py-2'>
        <CardHeader className='flex flex-col gap-4'>
          <CardTitle className='font-Nexa text-2xl font-bold text-traffic-white'>
            Sign Up
          </CardTitle>
          <CardDescription className='text-silver-gray'>
            Sign up to Tiger Wealth Capital to continue to Tiger Wealth Capital.
          </CardDescription>

          <div className='bg-gradient-cta inline-block rounded-md p-[1px]'>
            <button
              className='bg-dark-gray flex w-full items-center justify-center
                gap-4 rounded-md px-4 py-2 text-sm font-semibold uppercase
                text-traffic-white'
              type='button'>
              <img
                src='./website-icons/google.png'
                alt='Google logo'
              />
              Continue with Google
            </button>
          </div>
        </CardHeader>
        <div
          className='flex items-center gap-2 px-6 font-PTSerif text-sm
            text-silver-gray'>
          <div className='h-px flex-1 bg-silver-gray' />
          OR
          <div className='h-px flex-1 bg-silver-gray' />
        </div>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(data => signup(data))}
              className='space-y-4'>
              <p className='text-md font-PTSerif text-traffic-white'>
                Email Address
              </p>
              <FormField
                control={form.control}
                name='email'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete='email'
                        placeholder='Enter your email'
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className='text-sm text-red-500'>
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <p className='text-md font-PTSerif text-traffic-white'>
                Password
              </p>
              <FormField
                control={form.control}
                name='password'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete='new-password'
                        className='autofill:text-fill-white text-white'
                        placeholder='Create a password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className='text-sm text-red-500'>
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <div className='flex items-center gap-2'>
                <Checkbox
                  id='remember'
                  className='bg-dark-gray size-5
                    data-[state=checked]:bg-tangerine'
                />
                <Label
                  htmlFor='remember'
                  className='text-md font-PTSerif text-traffic-white'>
                  Remember me
                </Label>
              </div>

              <button
                type='submit'
                className='primary-button mt-2 w-full p-2 uppercase'
                disabled={isPending}
                onClick={() => console.log('BUTTON CLICKED')}>
                {isPending ? <Loader /> : 'Sign Up'}
              </button>
            </form>
          </Form>
          <CardFooter>
            <p
              className='mx-auto mt-4 max-w-[350px] text-center font-PTSerif
                text-sm text-silver-gray'>
              By clicking SIGN UP you agree to our{' '}
              <span className='cursor-pointer text-tangerine underline'>
                Terms of Service , Terms and Conditions
              </span>{' '}
              and{' '}
              <span className='cursor-pointer text-tangerine underline'>
                Privacy Policy
              </span>
            </p>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}
