import { LoginForm } from "@/components";

function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}

export default LoginPage;