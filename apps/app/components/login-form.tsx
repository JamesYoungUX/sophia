import { cn } from "@/lib/utils";
import { Button, Input, Label } from "@repo/ui";
import * as React from "react";
import { auth } from "../lib/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const { refetch } = auth.useSession();

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setFormError(null);
    
    try {
      await auth.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:5173/dashboard",
      });
    } catch (error) {
      console.error("Google login failed:", error);
      setFormError("Google login failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

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
    
    setIsLoading(true);
    
    try {
      const { error } = await auth.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/dashboard",
        rememberMe: true
      }, {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          // Session will be updated automatically
        },
        onError: (ctx) => {
          if (ctx?.error) {
            throw new Error(ctx.error.message || "Authentication failed");
          }
        }
      });
      
      if (error) {
        // Handle specific error types
        if (error.message?.includes("Invalid credentials") || 
            error.message?.includes("USER_NOT_FOUND") ||
            error.message?.includes("INVALID_PASSWORD")) {
          throw new Error("Invalid email or password. Please check your credentials and try again.");
        } else if (error.message?.includes("ACCOUNT_LOCKED")) {
          throw new Error("Your account has been temporarily locked. Please try again later.");
        } else if (error.message?.includes("NETWORK")) {
          throw new Error("Network error. Please check your connection and try again.");
        } else {
          throw new Error(error.message || "Login failed. Please try again.");
        }
      }
      
      // Refresh the session data
      await refetch();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setFormError(errorMessage);
    } finally {
      setIsLoading(false);
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
            className={cn("grid gap-6", className)}
            {...props}
            onSubmit={handleSubmit}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={isLoading || isGoogleLoading}
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
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={isLoading || isGoogleLoading}
                placeholder="Enter your password"
                className={formError && !password.trim() ? "border-red-500 focus:border-red-500" : ""}
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={isLoading || isGoogleLoading}
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
              disabled={isLoading || isGoogleLoading}
              onClick={handleGoogleLogin}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
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
