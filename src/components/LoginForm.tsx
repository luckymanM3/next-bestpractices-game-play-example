"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ValidationError } from "@/types";
import { login } from "@/services";
import { useUser } from "@/contexts";
import { MESSAGES, ROUTES } from "@/constants";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const validateForm = (username: string, password: string): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!username.trim()) {
      errors.push({ field: 'username', message: MESSAGES.LOGIN_VALIDATION_USERNAME_REQUIRED });
    } else if (username.length < 3) {
      errors.push({ field: 'username', message: MESSAGES.LOGIN_VALIDATION_USERNAME_MIN_LENGTH });
    }

    if (!password.trim()) {
      errors.push({ field: 'password', message: MESSAGES.LOGIN_VALIDATION_PASSWORD_REQUIRED });
    } else if (password.length < 3) {
      errors.push({ field: 'password', message: MESSAGES.LOGIN_VALIDATION_PASSWORD_MIN_LENGTH });
    }

    return errors;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setValidationErrors([]);

    // Validate form
    const errors = validateForm(username, password);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const result = await login(username, password);

      if (result.status === "success" && result.player) {
        document.cookie = "isLoggedIn=true; path=/; max-age=86400";
        localStorage.setItem('user', JSON.stringify(result.player));
        setUser(result.player);
        router.push(ROUTES.GAMES);
      } else {
        setError(result.error || MESSAGES.LOGIN_ERROR);
      }
    } catch {
      setError(MESSAGES.SOMETHING_WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Login</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Username"
          aria-label="Username"
          className={`w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent ${validationErrors.some(e => e.field === 'username')
            ? 'border-red-500 dark:border-red-400'
            : 'border-gray-300 dark:border-gray-600'
            }`}
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {validationErrors
          .filter(e => e.field === 'username')
          .map((error, index) => (
            <p key={index} className="text-red-500 dark:text-red-400 text-xs mt-1">
              {error.message}
            </p>
          ))}
      </div>

      <div className="mb-3">
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          className={`w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent ${validationErrors.some(e => e.field === 'password')
            ? 'border-red-500 dark:border-red-400'
            : 'border-gray-300 dark:border-gray-600'
            }`}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {validationErrors
          .filter(e => e.field === 'password')
          .map((error, index) => (
            <p key={index} className="text-red-500 dark:text-red-400 text-xs mt-1">
              {error.message}
            </p>
          ))}
      </div>

      {error && <p className="text-red-500 mb-3 dark:text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200 ${loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gray-900 hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}