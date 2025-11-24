import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="lg:flex hidden items-center gap-6 font-medium text-text dark:text-text-dark">
 <Link href="/seller" className="flex items-center gap-3 hover:text-primary transition duration-300"> Dashboard
          </Link>
          <Link href="/seller/services" className="flex items-center gap-3 hover:text-primary transition duration-300">
            My Services
          </Link>
          <Link href="/seller/profile" className="flex items-center gap-3 hover:text-primary transition duration-300">
           Profile
          </Link>
          <Link href="/seller/settings" className="flex items-center gap-3 hover:text-primary transition duration-300">
            Settings
          </Link>
    </nav>
  )
}

export default NavBar