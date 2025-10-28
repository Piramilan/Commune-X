import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn routing="hash" signUpUrl="/sign-up" afterSignInUrl="/dashboard" />
    </div>
  );
}
