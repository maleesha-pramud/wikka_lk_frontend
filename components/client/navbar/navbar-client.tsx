"use client"

import * as React from "react"
import { AuthDialog } from "@/components/client/login-dialog"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/client/ui/drawer"
import { ProfilePopover } from "@/components/client/popovers/profile-popover"

export function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [authDialogOpen, setAuthDialogOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "register">("login")

  const openAuthDialog = (mode: "login" | "register") => {
    setAuthMode(mode)
    setAuthDialogOpen(true)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md dark:border-gray-800 dark:bg-background-dark/95 px-4 md:px-6 py-4 shadow-sm transition-all">
      <div className="mx-auto flex max-w-350 items-center justify-between gap-4 md:gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl font-bold">storefront</span>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-primary dark:text-white whitespace-nowrap">
            Wikka.lk
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-10">
          <a
            className="group flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[22px] text-gray-400 group-hover:text-primary transition-colors">
              chat_bubble
            </span>
            Messages
          </a>
          <a
            className="group flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[22px] text-gray-400 group-hover:text-primary transition-colors">
              favorite
            </span>
            Favorites
          </a>
          <a
            className="group flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[22px] text-gray-400 group-hover:text-primary transition-colors">
              person
            </span>
            Profile
          </a>
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {!isLoggedIn && (
            <>
              <button
                onClick={() => openAuthDialog("login")}
                className="h-11 px-6 text-sm font-semibold border border-gray-200 rounded-md hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all bg-white dark:bg-background-dark text-text-main dark:text-white"
              >
                Login
              </button>
              <button
                onClick={() => openAuthDialog("register")}
                className="h-11 px-6 text-sm font-semibold border border-gray-200 rounded-md hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all bg-white dark:bg-background-dark text-text-main dark:text-white"
              >
                Register
              </button>
            </>
          )}
          {isLoggedIn && (
            <>
              <button className="flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-px hover:bg-primary-hover hover:shadow-primary/30 active:translate-y-px whitespace-nowrap">
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Upload</span>
              </button>
              <ProfilePopover isDesktop={true} />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center size-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[24px] text-text-main dark:text-white">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} direction="right">
        <DrawerContent className="rounded-none border-none">
          <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-2xl font-bold">storefront</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary dark:text-white">Wikka.lk</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center size-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-[24px] text-text-main dark:text-white">close</span>
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto h-full flex flex-col">
            {/* Mobile Menu Items */}
            <nav className="flex flex-col gap-1 px-3 py-4">
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/5 dark:text-gray-400 dark:hover:text-primary dark:hover:bg-primary/10 transition-colors font-semibold"
                href="#"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
                Messages
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/5 dark:text-gray-400 dark:hover:text-primary dark:hover:bg-primary/10 transition-colors font-semibold"
                href="#"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-[22px]">favorite</span>
                Favorites
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/5 dark:text-gray-400 dark:hover:text-primary dark:hover:bg-primary/10 transition-colors font-semibold"
                href="#"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-[22px]">person</span>
                Profile
              </a>
            </nav>

            {/* Mobile Auth Section */}
            {!isLoggedIn && (
              <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-col gap-3 mb-4">
                  <button
                    onClick={() => openAuthDialog("login")}
                    className="h-11 px-6 text-sm font-semibold border border-gray-200 rounded-md hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all bg-white dark:bg-background-dark text-text-main dark:text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openAuthDialog("register")}
                    className="h-11 px-6 text-sm font-semibold border border-gray-200 rounded-md hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all bg-white dark:bg-background-dark text-text-main dark:text-white"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Upload Button */}
            {isLoggedIn && (
              <div className="px-4 py-2">
                <button className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-px hover:bg-primary-hover hover:shadow-primary/30 active:translate-y-px">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  <span>Upload Product</span>
                </button>
              </div>
            )}

            {/* Spacer to push profile to bottom */}
            <div className="flex-1" />

            {/* Drawer Footer - Profile Section */}
            {isLoggedIn && (
              <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
                <ProfilePopover isDesktop={false} />
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Auth Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </header>
  )
}
