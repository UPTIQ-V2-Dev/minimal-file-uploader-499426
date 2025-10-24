import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import type { LoginRequest } from '@/types/user';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required')
});

export const LoginForm = () => {
    const { login, isLoginLoading, loginError } = useAuth();

    const form = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data: LoginRequest) => {
        login(data);
    };

    return (
        <Card className='w-full max-w-md'>
            <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl text-center'>Sign In</CardTitle>
                <CardDescription className='text-center'>
                    Enter your email and password to access your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='Enter your email'
                                            disabled={isLoginLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Enter your password'
                                            disabled={isLoginLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {loginError && (
                            <Alert variant='destructive'>
                                <AlertDescription>
                                    {loginError instanceof Error
                                        ? loginError.message
                                        : 'Login failed. Please try again.'}
                                </AlertDescription>
                            </Alert>
                        )}
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isLoginLoading}
                        >
                            {isLoginLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
