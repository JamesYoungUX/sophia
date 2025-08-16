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
  const [formError, setFormError] = React.useState<string | null>(null);
  const { refetch } = auth.useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);
    
    try {
      const { data, error } = await auth.signIn.email({
        email,
        password,
        callbackURL: "/",
        rememberMe: true
      }, {
        onRequest: () => {
          // Show loading state
          setIsLoading(true);
        },
        onSuccess: () => {
          // Session will be updated automatically by auth.useSession()
        },
        onError: (ctx) => {
          if (ctx?.error) {
            throw new Error(ctx.error.message || "Login failed");
          }
        }
      });
      
      if (error) {
        throw new Error(error.message || "Login failed");
      }
      
      // Refresh the session data
      await refetch();
    } catch (err: any) {
      setFormError(err?.message || "Login failed. Please check your credentials and try again.");
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
                disabled={isLoading}
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
                disabled={isLoading}
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
              disabled
            >
              Login with Google
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
          <Button variant="outline" className="w-full" type="button" disabled>
            SSO
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
