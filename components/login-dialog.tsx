"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { loginUser, registerUser } from "@/app/actions"
import { SuccessDialog } from "@/components/dialogs/success-dialog"
import { toast } from "sonner"

type AuthMode = "login" | "register"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
}

export function AuthDialog({ open, onOpenChange, mode, onModeChange }: AuthDialogProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [accountType, setAccountType] = React.useState<"buyer" | "seller">("buyer")

  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleSubmit = async () => {
    if (mode === "login") {
      try {
        const response = await loginUser(email, password);
        setSuccessMessage(response.message);
        onOpenChange(false);
        setShowSuccess(true);
        // Optionally, handle user data or redirect after dialog closes
      } catch (error) {
        console.error("Login failed:", error);
        const message = error instanceof Error ? error.message : "Login failed";
        toast.error(message);
      }
    } else {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      try {
        const response = await registerUser(name, email, address, password, accountType);
        setSuccessMessage(response.message);
        onOpenChange(false);
        setShowSuccess(true);
      } catch (error) {
        console.error("Registration failed:", error);
        const message = error instanceof Error ? error.message : "Registration failed";
        toast.error(message);
      }
    }
  }

  const toggleMode = () => {
    onModeChange(mode === "login" ? "register" : "login")
    // Reset form fields when switching modes
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setName("")
    setAddress("")
    setAccountType("buyer")
  }

  const isLogin = mode === "login"

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-106.25 bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-0 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="text-center pb-0 pt-8 px-6">
            <DialogTitle className="text-2xl font-bold text-text-main dark:text-white">
              {isLogin ? "Welcome back" : "Create account"}
            </DialogTitle>
            <DialogDescription className="text-text-secondary dark:text-gray-400 text-base">
              {isLogin ? "Sign in to your account to continue" : "Join our community and start buying & selling"}
            </DialogDescription>
          </DialogHeader>
          <div className={`px-6 py-6 pt-0 ${isLogin ? "space-y-5" : "space-y-4"}`}>
            {!isLogin && (
              <div className="space-y-2 pb-2">
                <div className="flex gap-4">
                  <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg border-2 transition-all ${accountType === "buyer" ? "bg-primary/10 border-primary text-primary shadow-md" : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                    <input
                      type="radio"
                      name="accountType"
                      value="buyer"
                      checked={accountType === "buyer"}
                      onChange={(e) => setAccountType(e.target.value as "buyer" | "seller")}
                      className="sr-only"
                    />
                    <span className={`material-symbols-outlined text-[20px] ${accountType === "buyer" ? "text-primary" : "text-gray-400"}`}>{accountType === "buyer" ? "check_circle" : "radio_button_unchecked"}</span>
                    <span className="text-sm font-medium">Buyer Account</span>
                  </label>
                  <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg border-2 transition-all ${accountType === "seller" ? "bg-primary/10 border-primary text-primary shadow-md" : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                    <input
                      type="radio"
                      name="accountType"
                      value="seller"
                      checked={accountType === "seller"}
                      onChange={(e) => setAccountType(e.target.value as "buyer" | "seller")}
                      className="sr-only"
                    />
                    <span className={`material-symbols-outlined text-[20px] ${accountType === "seller" ? "text-primary" : "text-gray-400"}`}>{accountType === "seller" ? "check_circle" : "radio_button_unchecked"}</span>
                    <span className="text-sm font-medium">Seller Account</span>
                  </label>
                </div>
              </div>
            )}
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-text-main dark:text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-gray-400">person</span>
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-primary/20 dark:focus:border-primary dark:focus:ring-primary/20 bg-white dark:bg-gray-800 text-text-main dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-text-main dark:text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-gray-400">email</span>
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-primary/20 dark:focus:border-primary dark:focus:ring-primary/20 bg-white dark:bg-gray-800 text-text-main dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-semibold text-text-main dark:text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-gray-400">location_on</span>
                  Address
                </label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-11 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-primary/20 dark:focus:border-primary dark:focus:ring-primary/20 bg-white dark:bg-gray-800 text-text-main dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            )}
            <div className="space-y-2 flex gap-4">
              <div className="w-full">
                <label htmlFor="password" className="text-sm font-semibold text-text-main dark:text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-gray-400">lock</span>
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-primary/20 dark:focus:border-primary dark:focus:ring-primary/20 bg-white dark:bg-gray-800 text-text-main dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              {!isLogin && (
                <div className="w-full">
                  <label htmlFor="confirmPassword" className="text-sm font-semibold text-text-main dark:text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-gray-400">lock</span>
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-primary/20 dark:focus:border-primary dark:focus:ring-primary/20 bg-white dark:bg-gray-800 text-text-main dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
              )}
            </div>
            {isLogin ? (
              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="size-4 rounded border-gray-300 text-primary focus:ring-primary/20 cursor-pointer" />
                  <span className="text-text-secondary dark:text-gray-400 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:text-primary-hover font-semibold transition-colors text-sm">
                  Forgot password?
                </a>
              </div>
            ) : (
              <div className="flex items-start gap-2.5 text-sm pt-1">
                <input type="checkbox" className="size-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary/20 cursor-pointer" />
                <label className="text-text-secondary dark:text-gray-400 leading-relaxed cursor-pointer select-none">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:text-primary-hover hover:underline font-semibold transition-all">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:text-primary-hover hover:underline font-semibold transition-all">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-col! gap-4 px-6 pb-6 pt-0">
            <Button
              onClick={handleSubmit}
              className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-px hover:shadow-primary/30 active:translate-y-0 rounded-lg"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isLogin ? "login" : "person_add"}
              </span>
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
            <p className="text-center text-sm text-text-secondary dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span
                onClick={toggleMode}
                className="text-primary hover:text-primary-hover hover:underline font-semibold cursor-pointer transition-all"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </span>
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <SuccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        title="Successful!"
        description={successMessage}
        buttonText="Continue"
      />
    </>
  );
}