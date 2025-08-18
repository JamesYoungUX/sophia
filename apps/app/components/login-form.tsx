import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const { login, signInWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Client-side validation
    if (!email.trim()) {
      setFormError("Email is required");
      return;
    }
    
    if (!password.trim()) {
      setFormError("Password is required");
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address");
      return;
    }
    
    const result = await login({ email: email.trim(), password });
    
    if (result.success) {
      navigate({ to: "/dashboard" });
    } else {
      const errorMessage = result.error instanceof Error 
        ? result.error.message 
        : "Login failed. Please try again.";
      setFormError(errorMessage);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Google sign-in button clicked");
    
    try {
      const result = await signInWithGoogle();
      console.log("Google sign-in result:", result);
      
      if (!result.success) {
        const errorMessage = result.error instanceof Error 
          ? result.error.message 
          : "Google sign-in failed. Please try again.";
        console.error("Google sign-in error:", errorMessage);
        setFormError(errorMessage);
      }
    } catch (error) {
      console.error("Google sign-in exception:", error);
      setFormError("An unexpected error occurred during sign-in.");
    }
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Sophia logo absolutely at the top left of the page, moderately large and higher up */}
      <img
        src="/Logo.svg"
        alt="Sophia Logo"
        className="fixed top-2 left-6 w-40 h-40 object-contain z-50"
      />
      {/* Left: Login form */}
      <div className="lg:p-8 flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
          </div>
          <form
            className="grid gap-6"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={isLoading}
                placeholder="Enter your email"
                className={formError && !email.trim() ? "border-red-500 focus:border-red-500" : ""}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={isLoading}
                placeholder="Enter your password"
                className={formError && !password.trim() ? "border-red-500 focus:border-red-500" : ""}
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="relative flex items-center justify-center">
              <span className="bg-background px-2 text-muted-foreground z-10">
                Or continue with
              </span>
              <div className="absolute left-0 right-0 top-1/2 border-t border-border -z-10" />
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              type="button"
              disabled={isLoading}
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? "Connecting to Google..." : "Continue with Google"}
            </Button>
          </form>
          {formError && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">
                {formError}
              </span>
            </div>
          )}
          <Button 
            variant="outline" 
            className="w-full text-gray-400 border-gray-200 cursor-not-allowed" 
            type="button" 
            disabled
          >
            SSO (Coming Soon)
          </Button>
        </div>
      </div>
      {/* Right: Placeholder space for future content */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        {/* Placeholder space for future content */}
      </div>
    </div>
  );
}
