"use client"

import * as React from "react"
import { AuthDialog } from "@/components/client/login-dialog"
import { ProfilePopover } from "@/components/client/popovers/profile-popover"
import { MobileDrawer } from "@/components/client/navbar/mobile-drawer"
import Link from "next/link"
import { logoutUser } from "@/app/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"

export function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { getCartSummary } = useCart()
  const cartSummary = getCartSummary()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [authDialogOpen, setAuthDialogOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "register">("login")
  const [searchQuery, setSearchQuery] = React.useState("")
  const router = useRouter()

  const openAuthDialog = (mode: "login" | "register") => {
    setAuthMode(mode)
    setAuthDialogOpen(true)
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
      setMobileMenuOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
      const message = error instanceof Error ? error.message : "Logout failed"
      toast.error(message)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md dark:border-gray-800 dark:bg-background-dark/95 px-4 md:px-6 py-4 shadow-sm transition-all">
      <div className="mx-auto flex max-w-350 items-center justify-between gap-4 md:gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer shrink-0">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl font-bold">storefront</span>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-primary dark:text-white whitespace-nowrap">
            Wikka.lk
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-10">
          <div className="relative w-full max-w-xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-gray-400 pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search for products, categories, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-12 pr-4 rounded-full border border-gray-200 bg-gray-50/50 text-sm text-text-main placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:bg-gray-800/50 dark:border-gray-700 dark:text-white dark:focus:bg-gray-800 transition-all"
            />
          </div>
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Cart Icon */}
          <Link
            href="/buyer/cart"
            className="relative flex items-center justify-center size-11 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px] text-text-main dark:text-white">
              shopping_cart
            </span>
            {cartSummary.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold text-white bg-primary rounded-full">
                {cartSummary.itemCount > 9 ? "9+" : cartSummary.itemCount}
              </span>
            )}
          </Link>

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
              <Link href="/sell" className="flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-px hover:bg-primary-hover hover:shadow-primary/30 active:translate-y-px whitespace-nowrap">
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Sell Product</span>
              </Link>
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
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLoginClick={() => openAuthDialog("login")}
        onRegisterClick={() => openAuthDialog("register")}
        onLogout={handleLogout}
      />

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
