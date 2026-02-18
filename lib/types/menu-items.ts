export type MenuItem =
  | {
      id: string
      label: string
      icon: string
      href: string
    }
  | {
      id: string
      label: string
      icon: string
      action: string
    }
  | {
      type: "divider"
    }

export interface SidebarNavItem {
  id: string
  label: string
  icon: string
  href: string
  badge?: string
}

export interface NavigationConfig {
  profileMenuItems: MenuItem[]
  sidebarNavItems: SidebarNavItem[]
}

export interface MenuConfig {
  menuItems: MenuItem[]
}
