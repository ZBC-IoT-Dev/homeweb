"use client";

import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";

import AuthScreen from "./auth-screen";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="flex items-center gap-2">
          <Spinner />
          <p>We are loading your session...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <AuthScreen />;
  }

  return <div>{children}</div>;
}
