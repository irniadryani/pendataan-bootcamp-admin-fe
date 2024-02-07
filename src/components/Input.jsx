import { useFormContext } from 'react-hook-form'
import { HiExclamationCircle } from 'react-icons/hi'

import { classNames } from '@/lib/common'

export const Input = ({
	label,
	placeholder = '',
	helperText = '',
	id,
	type = 'text',
	readOnly = false,
	validation = {},
	className,
	onChange,
	...rest
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div>
			<div className='relative z-0 mt-1'>
				<input
					{...register(id, validation)}
					{...rest}
					type={type}
					name={id}
					onChange={onChange}
					id={id}
					readOnly={readOnly}
					className={classNames(
						readOnly
							? 'cursor-not-allowed border-[#A3C8FF] bg-[#A3C8FF]/10 focus:border-[#A3C8FF] focus:ring-0'
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

				{errors[id] && (
					<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
						<HiExclamationCircle className='text-xl text-red-500' />
					</div>
				)}
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
