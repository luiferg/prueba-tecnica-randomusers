import { ButtonProps } from '@/types'

const Button = ({ ariaLabel, onClick, children }: ButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className='bg-gradient-to-r from-blue-500 to-blue-600 lg:active:to-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-offset-slate-100'
    >
      {children}
    </button>
  )
}

export default Button
