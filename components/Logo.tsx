'use client';
import { useRouter } from "next/navigation";

const Logo = ({className = ''}) => {
  const router = useRouter();
  return (
     <div onClick={() => router.push('/seller')}  className={`relative inline-block group cursor-pointer mb-4 ${className}`}>
        <h1 className="text-3xl relative gap-3 font-extrabold mb-1 text-primary group-hover:text-primary-hover transition duration-300">
          Bookly
        </h1>
        <span className="absolute left-0 bottom-0 w-1/2 h-[4px] bg-primary rounded-full group-hover:bg-primary-hover transition duration-300 group-hover:scale-70"></span>
        </div>
  )
}

export default Logo