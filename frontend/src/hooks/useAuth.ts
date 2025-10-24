import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import { isAuthenticated, getStoredUser, clearAuthData } from '@/lib/api';
import type { LoginRequest, User } from '@/types/user';

export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: user, isLoading: isLoadingUser } = useQuery({
        queryKey: ['auth', 'user'],
        queryFn: () => getStoredUser(),
        staleTime: Infinity
    });

    const loginMutation = useMutation({
        mutationFn: (credentials: LoginRequest) => authService.login(credentials),
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'user'], data.user);
            navigate('/');
        },
        onError: error => {
            console.error('Login failed:', error);
        }
    });

    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            clearAuthData();
            queryClient.setQueryData(['auth', 'user'], null);
            queryClient.clear();
            navigate('/login');
        },
        onError: error => {
            console.error('Logout failed:', error);
            clearAuthData();
            queryClient.setQueryData(['auth', 'user'], null);
            queryClient.clear();
            navigate('/login');
        }
    });

    const login = (credentials: LoginRequest) => {
        loginMutation.mutate(credentials);
    };

    const logout = () => {
        logoutMutation.mutate();
    };

    return {
        user: user as User | null,
        isAuthenticated: isAuthenticated(),
        isLoading: isLoadingUser || loginMutation.isPending || logoutMutation.isPending,
        isLoginLoading: loginMutation.isPending,
        isLogoutLoading: logoutMutation.isPending,
        loginError: loginMutation.error,
        login,
        logout
    };
};
