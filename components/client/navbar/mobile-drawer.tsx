"use client"

import * as React from "react"
import Link from "next/link"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/client/ui/drawer"
import { ProfilePopover } from "@/components/client/popovers/profile-popover"
import navigationConfigData from "@/lib/navigation-config.json"
import type { MenuItem, NavigationConfig } from "@/lib/types/menu-items"

const navigationConfig = navigationConfigData as NavigationConfig

interface MobileDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  isLoggedIn: boolean
  searchQuery: string
  onSearchChange: (query: string) => void
  onLoginClick: () => void
  onRegisterClick: () => void
  onLogout: () => Promise<void>
}

export function MobileDrawer({
  isOpen,
  onOpenChange,
  isLoggedIn,
  searchQuery,
  onSearchChange,
  onLoginClick,
  onRegisterClick,
  onLogout,
}: MobileDrawerProps) {
  const handleItemClick = async (item: MenuItem) => {
    if ("action" in item && item.action === "logout") {
      await onLogout()
    }
    onOpenChange(false)
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
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
            onClick={() => onOpenChange(false)}
            className="flex items-center justify-center size-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[24px] text-text-main dark:text-white">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto h-full flex flex-col">
          {/* Mobile Search */}
          <div className="px-4 py-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-gray-400 pointer-events-none">
                search
              </span>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full h-11 pl-12 pr-4 rounded-full border border-gray-200 bg-gray-50/50 text-sm text-text-main placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:bg-gray-800/50 dark:border-gray-700 dark:text-white dark:focus:bg-gray-800 transition-all"
              />
            </div>
          </div>

          {/* Mobile Auth Section */}
          {!isLoggedIn && (
            <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex flex-col gap-3 mb-4">
                <button
                  onClick={onLoginClick}
                  className="h-11 px-6 text-sm font-semibold border border-gray-200 rounded-md hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all bg-white dark:bg-background-dark text-text-main dark:text-white"
                >
                  Login
                </button>
                <button
                  onClick={onRegisterClick}
                  className="h-11 px-6 text-sm font-semibold border border-gray-200 rounded-md hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all bg-white dark:bg-background-dark text-text-main dark:text-white"
                >
                  Register
                </button>
              </div>
            </div>
          )}

          {/* Mobile Sell Product Button */}
          {isLoggedIn && (
            <div className="px-4 py-2">
              <Link href="/sell" className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-px hover:bg-primary-hover hover:shadow-primary/30 active:translate-y-px">
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Sell Product</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Items for Logged In Users */}
          {isLoggedIn && (
            <nav className="flex flex-col gap-1 px-3 py-4 border-t border-gray-100 dark:border-gray-800">
              {navigationConfig.profileMenuItems.map((item: MenuItem, index: number) => {
                if ("type" in item && item.type === "divider") {
                  return <div key={`divider-${index}`} className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                }

                if ("action" in item && item.action === "logout") {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors font-semibold text-left w-full"
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      {item.label}
                    </button>
                  )
                }

                if ("href" in item) {
                  return (
                    <Link
                      key={item.id}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/5 dark:text-gray-400 dark:hover:text-primary dark:hover:bg-primary/10 transition-colors font-semibold"
                      href={item.href}
                      onClick={() => onOpenChange(false)}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      {item.label}
                    </Link>
                  )
                }

                return null
              })}
            </nav>
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
  )
}
