

const Logo = ({className = ''}) => {
  return (
     <div className={`relative inline-block mb-4 ${className}`}>
        <h1 className="text-3xl relative gap-3 font-extrabold mb-1 text-primary">
          Bookly
        </h1>
        <span className="absolute left-0 bottom-0 w-1/2 h-[4px] bg-primary rounded-full"></span>
        </div>
  )
}

export default Logo