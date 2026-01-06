import { NavbarClient } from "../client/navbar/navbar-client"
import { cookies } from "next/headers"

export async function Navbar() {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.has("JSESSIONID")

  return <NavbarClient isLoggedIn={isLoggedIn} />
}