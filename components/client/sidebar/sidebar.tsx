"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import navigationConfigData from "@/lib/navigation-config.json";
import type { NavigationConfig } from "@/lib/types/menu-items";

const navigationConfig = navigationConfigData as NavigationConfig;

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden hidden" id="sidebar-overlay"></div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen bg-surface-light dark:bg-surface-dark border-r border-border-light/50 dark:border-border-dark transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } lg:sticky lg:top-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo & Toggle */}
          <div className="flex items-center justify-between p-6 border-b border-border-light/50 dark:border-border-dark">
            {!isCollapsed && (
              <Link href="/" className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary text-white">
                  <span className="material-symbols-outlined text-xl">storefront</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">
                  Wikka.lk
                </span>
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center size-8 rounded-lg hover:bg-background-light dark:hover:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                {isCollapsed ? "menu_open" : "menu"}
              </span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navigationConfig.sidebarNavItems.map((item) => {
                const isActive = pathname === item.href || item.href == "/dashboard";
                
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark hover:text-text-main-light dark:hover:text-text-main-dark"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 font-semibold text-sm">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            isActive 
                              ? "bg-white/20 text-white" 
                              : "bg-primary text-white"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border-light/50 dark:border-border-dark">
            <div className={`flex items-center gap-3 p-3 rounded-xl bg-background-light dark:bg-background-dark ${
              isCollapsed ? "justify-center" : ""
            }`}>
              <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                JD
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
                    john@example.com
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
