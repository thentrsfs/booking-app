'use client'
import Header from "@/components/Header"
import NavSidebar from "@/components/NavSidebar"
import { useSeller } from "@/context/SellerContext"

const SellerLayout = ({children} : {children: React.ReactNode}) => {
    const { showSidebar, setShowSidebar} = useSeller()
  return (
    <div className="min-h-screen p-4 xl:px-[20%] xl:py-6 bg-background dark:bg-background-dark text-text dark:text-text-dark font-sans">
    <header>
        <Header setShowSidebar={setShowSidebar} />
        </header>
        <NavSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <main className="mt-6">
            {children}
        </main>
              </div>
  )
}

export default SellerLayout