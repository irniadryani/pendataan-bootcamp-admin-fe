import { classNames } from '@/lib/common'
import { NavLink as Link } from 'react-router-dom'

const baseStyles = {
	solid: 'group inline-flex items-center justify-center text-sm font-outfit font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
	outline:
		'group inline-flex items-center justify-center text-sm font-outfit font-semibold focus:outline-none',
}

const variantStyles = {
	solid: {
		blue: 'bg-[#4987A6] text-white hover:text-slate-100 hover:opacity-75 active:opacity-50 active:text-blue-100 focus-visible:outline-blue-600',
		gradientBlue: 'solid-gradient--btn text-[#FCFCFC] hover:text-slate-100',
		transparent: 'bg-transparent rounded-xl',
		blur: 'border border-[rgba(255,255,255,0.20)] bg-[rgba(252,252,252,0.15)] text-white',
	},
	outline: {
		blue: 'bg-white border border-[#2C5AFD] text-[#2C5AFD]',
		gradientBlue:
			'outline-gradient--btn text-[#2E68FF] hover:text-[#FCFCFC]',
		transparent: 'bg-transparent border text-black',
	},
}

export const Button = ({
	variant = 'solid',
	color = 'slate',
	type = '',
	className,
	onClick,
	target,
	href,
	...props
}) => {
	className = classNames(
		baseStyles[variant],
		variantStyles[variant][color],
		className
	)

	return href ? (
		<Link target={target} href={href} className={className} {...props} />
	) : (
		<button
			type={type}
			className={className}
			onClick={onClick}
			{...props}
		/>
	)
}
