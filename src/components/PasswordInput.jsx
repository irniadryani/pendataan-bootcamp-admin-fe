import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'

import { classNames } from '@/lib/common'

export const PasswordInput = ({
	label,
	placeholder = '',
	helperText = '',
	id,
	readOnly = false,
	className,
	validation = {},
	...rest
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const [showPassword, setShowPassword] = useState(false)
	const togglePassword = () => setShowPassword((prev) => !prev)

	return (
		<div>
			<div className='relative mt-1'>
				<input
					{...register(id, validation)}
					{...rest}
					type={showPassword ? 'text' : 'password'}
					name={id}
					id={id}
					readOnly={readOnly}
					className={classNames(
						readOnly
							? 'cursor-not-allowed border-[#A3C8FF] bg-gray-100 focus:border-[#E1E1E1] focus:ring-0'
							: errors[id]
							? 'border-red-500 focus:border-red-500 focus:ring-red-500'
							: 'focus:border-[#446ca8] focus:ring-[#446ca8] border-[#A3C8FF]',
						`peer block w-full border outline-none appearance-none rounded-md px-4 pt-5 shadow-sm ${className}`
					)}
					placeholder={placeholder}
					aria-describedby={id}
				/>

				<label
					htmlFor={id}
					className='absolute left-4 top-4 z-0 origin-[0] -translate-y-3 scale-75 transform text-sm text-[#A0AEC0] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-[#8A8A8A]'
				>
					{label}
				</label>

				<button
					onClick={(e) => {
						e.preventDefault()
						togglePassword()
					}}
					className='focus:ring-primary-500 absolute inset-y-0 right-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none focus:ring'
				>
					{showPassword ? (
						<HiEyeOff className='cursor-pointer text-xl text-gray-500 hover:text-gray-600' />
					) : (
						<HiEye className='cursor-pointer text-xl text-gray-500 hover:text-gray-600' />
					)}
				</button>
			</div>
			<div className='mt-1'>
				{helperText !== '' && (
					<p className='text-xs font-normal text-gray-500'>
						{helperText}
					</p>
				)}
				{errors[id] && (
					<span className='text-sm font-normal text-red-500'>
						{errors[id].message}
					</span>
				)}
			</div>
		</div>
	)
}
