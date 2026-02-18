import { logoutUser } from "@/app/actions"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/client/ui/popover"
import Image from "next/image"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import navigationConfigData from "@/lib/navigation-config.json"
import type { MenuItem, NavigationConfig } from "@/lib/types/menu-items"

const navigationConfig = navigationConfigData as NavigationConfig


interface ProfilePopoverProps {
  isDesktop: boolean
}

export function ProfilePopover({ isDesktop }: ProfilePopoverProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {isDesktop ? (
          <div className="size-11 cursor-pointer overflow-hidden rounded-full border-2 border-white ring-1 ring-gray-100 dark:border-gray-700 dark:ring-gray-800 shrink-0 hover:ring-primary/30 transition-all">
            <Image
              width={44}
              height={44}
              className="h-full w-full object-cover"
              alt="User profile avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRpYHOqajivS0wCP-hE2yyA9nuZAtcKMiHDkE2Y2qBhN7I2ApLzUpEuPe0YP1DpVDLBJgu2IARzqZG1P0za8P47_m_34YvDQMq9bj4UQk-5JYTjNJvR3AZ9DJjwk_NojD-qfppMHYFmfdNtlELnJxI1XZisxV6kr2Zl8IXDZA7ee3hWH312hfCMB1FD6fYmBvCJbvJhzwOx0cwIUbTBCln5w_mAzv0kJw8WkG0z26kziDydAPLi-gnokEM9AAp1BFcW7V3TOuDA1A"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="size-12 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700 ring-1 ring-gray-100 dark:ring-gray-800 shrink-0">
              <Image
                width={48}
                height={48}
                className="h-full w-full object-cover"
                alt="User profile avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRpYHOqajivS0wCP-hE2yyA9nuZAtcKMiHDkE2Y2qBhN7I2ApLzUpEuPe0YP1DpVDLBJgu2IARzqZG1P0za8P47_m_34YvDQMq9bj4UQk-5JYTjNJvR3AZ9DJjwk_NojD-qfppMHYFmfdNtlELnJxI1XZisxV6kr2Zl8IXDZA7ee3hWH312hfCMB1FD6fYmBvCJbvJhzwOx0cwIUbTBCln5w_mAzv0kJw8WkG0z26kziDydAPLi-gnokEM9AAp1BFcW7V3TOuDA1A"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-main dark:text-white truncate">John Doe</p>
              <p className="text-xs text-text-secondary dark:text-gray-400 truncate">john@example.com</p>
            </div>
            <span className="material-symbols-outlined text-[20px] text-gray-400 shrink-0">chevron_right</span>
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-0">
        <div className="flex flex-col">
          {navigationConfig.profileMenuItems.map((item: MenuItem, index: number) => {
            if ("type" in item && item.type === "divider") {
              return <div key={`divider-${index}`} className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
            }

            if ("action" in item && item.action === "logout") {
              return (
                <button
                  key={item.id}
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 transition-colors text-left focus:outline-none cursor-pointer"
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
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </Link>
              )
            }

            return null
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}