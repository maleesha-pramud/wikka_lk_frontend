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

export interface StaticData {
  profileMenuItems: MenuItem[]
  sidebarNavItems: SidebarNavItem[]
  buyerSidebarNavItems: SidebarNavItem[]
  adminSidebarNavItems: SidebarNavItem[]
}

export interface MenuConfig {
  menuItems: MenuItem[]
}
