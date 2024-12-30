import { cn } from "@/utils/style"
import { FC } from "react"

interface CardAnswer extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
    mainColor: string,
    shadowColorRgb: string
}

export const CardAnswer: FC<CardAnswer> = ({ children, className, mainColor, shadowColorRgb, ...props }) => {
    return <div style={{ backgroundColor: `#${mainColor}`, boxShadow: `0px 10px rgba(${shadowColorRgb}` }} className={cn(` cursor-pointer rounded-xl  flex-all-center`, className)} {...props}>
        <p className='text-white text-4xl'>
            {children}
        </p>
    </div>
}