import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts";

export const useAuth = () => {
  const router = useRouter();
  const { user, logout, isLoading: userLoading } = useUser();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isLoggedIn = document.cookie
      .split('; ')
      .find(row => row.startsWith('isLoggedIn='))
      ?.split('=')[1];

    if (isLoggedIn !== 'true') {
      router.push('/login');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const isAuthenticated = !!user;
  const isLoading = userLoading || isChecking;

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: handleLogout
  };
};
