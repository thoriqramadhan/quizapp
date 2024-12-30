import { cn } from "@/utils/style"
import { FC } from "react"

interface CardAnswer extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
    mainColor: string,
    shadowColorRgb: string
}

export const CardAnswer: FC<CardAnswer> = ({ children, className, mainColor, shadowColorRgb, ...props }) => {
    return <div className={cn(`bg-[#${mainColor}] cursor-pointer rounded-xl drop-shadow-[0_10px_rgba(${shadowColorRgb})] flex-center`, className)} {...props}>
        <p className='text-white text-4xl'>
            {children}
        </p>
    </div>
}