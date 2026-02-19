"use client";

import { useState } from "react";

import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/lib/auth-client";

export default function AuthScreen() {
  const [authFlow, setAuthFlow] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignInSocial = async () => {
    setLoading(true);
    await signIn.social({
      provider: "github",
    });
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (authFlow === "login") {
      await signIn.email(
        {
          email,
          password,
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            alert(ctx.error.message);
          },
        }
      );
    } else {
      await signUp.email(
        {
          email,
          password,
          name,
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            alert(ctx.error.message);
          },
        }
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome to Home Assistant</CardTitle>
          <CardDescription>
            Use one of the following methods to {authFlow}
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() =>
                setAuthFlow(authFlow === "login" ? "signup" : "login")
              }
            >
              {authFlow === "login" ? "Sign up" : "Login"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="auth-form" onSubmit={handleEmailAuth}>
            {authFlow == "login" ? (
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            form="auth-form"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : authFlow === "login"
                ? "Login"
                : "Sign up"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignInSocial}
            disabled={loading}
          >
            <FaGithub />
            {authFlow === "login" ? "Login" : "Sign up"} with Github
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
