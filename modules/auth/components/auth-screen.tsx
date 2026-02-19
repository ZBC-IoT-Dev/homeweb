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
import { signIn } from "@/lib/auth-client";

export default function AuthScreen() {
  const [authFlow, setAuthFlow] = useState<"login" | "signup">("login");

  const handleSignInSocial = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/",
    });
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
          {authFlow == "login" ? (
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
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
                  />
                </div>
              </div>
            </form>
          ) : (
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Password"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            {authFlow === "login" ? "Login" : "Sign up"}
          </Button>
          <Button variant="outline" className="w-full">
            <FaGithub />
            {authFlow === "login" ? "Login" : "Sign up"} with Github
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
