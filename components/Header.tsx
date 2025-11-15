    'use client';
    import Logo from "./Logo";
    import { Menu } from "lucide-react"

    const Header = ({setShowSidebar} : {setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <div className="flex justify-between border-b border-gray-300 mb-4 dark:border-gray-700">
    <Logo />
    <Menu className="mt-2 lg:hidden" onClick={() => setShowSidebar(true)} size={28} color="#2563eb"/>
            </div>
    )
    }

    export default Header