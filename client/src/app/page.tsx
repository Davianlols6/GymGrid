'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { ModeToggle } from "@/components/mode-toggle"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoading, setLoading] = useState(true)

  const { push } = useRouter();
  useEffect(() => {
    // Get user data and if no errors, redirect user to home page else stick to this page
    fetch("/api/member/auth")
      .then((res) => {
        if (res.status === 200) {
          push("/home");
        } else {
          setLoading(false)
        }
      })
  }, [])

  const [registerUsername, setregisterUsername] = useState("")
  const [registerEmail, setregisterEmail] = useState("")
  const [registerPassword, setregisterPassword] = useState("")
  const [registerConfirmPassword, setregisterConfirmPassword] = useState("")
  const [registerAlertMessage, setregisterAlertMessage] = useState("")

  const [loginAlertMessage, setloginAlertMessage] = useState("")
  const [loginUsername, setloginUsername] = useState("")
  const [loginPassword, setloginPassword] = useState("")

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function registerUser() {
    setregisterAlertMessage("");

    if (registerUsername === "") {
      setregisterAlertMessage("Please enter a username");
      return;
    }
    if (registerEmail === "") {
      setregisterAlertMessage("Please enter an email address");
      return;
    }
    if (!validateEmail(registerEmail)) {
      setregisterAlertMessage("Please enter a valid email address");
      return;
    }
    if (registerPassword === "") {
      setregisterAlertMessage("Please enter a password");
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setregisterAlertMessage("Passwords do not match");
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      }),
    });
    if (response.status === 200) {
      push("/home");
    } else {
      const data = await response.json();
      setregisterAlertMessage(data.error);
    }
  }

  async function loginUser() {
    setloginAlertMessage("");

    if (loginUsername === "") {
      setloginAlertMessage("Please enter a username");
      return;
    }
    if (loginPassword === "") {
      setloginAlertMessage("Please enter a password");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });
    if (response.status === 200) {
      push("/home");
    } else {
      const data = await response.json();
      setloginAlertMessage(data.error);
    }
  }

  if (isLoading) return (
    <div className="block">
      <div className="flex items-center h-[80vh] px-3">
        <Skeleton className="w-[400px] mx-auto">
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded" />
            <div className="h-6 bg-gray-300 rounded" />
            <div className="h-6 bg-gray-300 rounded" />
            <div className="h-6 bg-gray-300 rounded" />
          </div>
        </Skeleton>
      </div>
    </div>
  )

  if (!isLoading) return (
    <>
      <div className="text-end mt-3 mr-3">
        <ModeToggle />
      </div>
      <div className="block">
        <div className="flex items-center h-[80vh] px-3">
          <Tabs defaultValue="login" className="w-[400px] mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your username and password to login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" onChange={(e) => { setloginUsername(e.target.value) }} value={loginUsername} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" onChange={(e) => { setloginPassword(e.target.value) }} value={loginPassword} />
                  </div>
                  {loginAlertMessage && (
                    <div className="space-y-1">
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          {loginAlertMessage}
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-9" onClick={loginUser}>Login</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Enter your email, username and password to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="registerusername" onChange={(e) => { setregisterUsername(e.target.value) }} value={registerUsername} type="text" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="registeremail" type="email" onChange={(e) => { setregisterEmail(e.target.value) }} value={registerEmail} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="registerpassword" type="password" onChange={(e) => { setregisterPassword(e.target.value) }} value={registerPassword} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirmpassword">Confirm Your Password</Label>
                    <Input id="registerconfirmpassword" type="password" onChange={(e) => { setregisterConfirmPassword(e.target.value) }} value={registerConfirmPassword} />
                  </div>
                  {registerAlertMessage && (
                    <div className="space-y-1">
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          {registerAlertMessage}
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-9" onClick={registerUser}>Register</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
