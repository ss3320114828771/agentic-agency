'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

// Button variants
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'danger' 
  | 'success' 
  | 'warning' 
  | 'gradient'

// Button sizes
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Button props interface
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  href?: string
  fullWidth?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  shadow?: boolean
  animate?: boolean
}

// Variant styles mapping
const variantStyles = {
  primary: {
    base: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white',
    hover: 'hover:from-purple-700 hover:to-purple-800',
    active: 'active:from-purple-800 active:to-purple-900',
    focus: 'focus:ring-purple-500',
    border: 'border-transparent',
    disabled: 'disabled:from-purple-300 disabled:to-purple-400'
  },
  secondary: {
    base: 'bg-gradient-to-r from-pink-600 to-pink-700 text-white',
    hover: 'hover:from-pink-700 hover:to-pink-800',
    active: 'active:from-pink-800 active:to-pink-900',
    focus: 'focus:ring-pink-500',
    border: 'border-transparent',
    disabled: 'disabled:from-pink-300 disabled:to-pink-400'
  },
  gradient: {
    base: 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white',
    hover: 'hover:from-purple-700 hover:via-pink-700 hover:to-orange-700',
    active: 'active:from-purple-800 active:via-pink-800 active:to-orange-800',
    focus: 'focus:ring-purple-500',
    border: 'border-transparent',
    disabled: 'disabled:opacity-50'
  },
  outline: {
    base: 'bg-transparent text-white border-2 border-white/30',
    hover: 'hover:bg-white/10 hover:border-white/50',
    active: 'active:bg-white/20',
    focus: 'focus:ring-white/50',
    border: 'border-white/30',
    disabled: 'disabled:opacity-50 disabled:hover:bg-transparent'
  },
  ghost: {
    base: 'bg-transparent text-white',
    hover: 'hover:bg-white/10',
    active: 'active:bg-white/20',
    focus: 'focus:ring-white/50',
    border: 'border-transparent',
    disabled: 'disabled:opacity-50 disabled:hover:bg-transparent'
  },
  danger: {
    base: 'bg-gradient-to-r from-red-600 to-red-700 text-white',
    hover: 'hover:from-red-700 hover:to-red-800',
    active: 'active:from-red-800 active:to-red-900',
    focus: 'focus:ring-red-500',
    border: 'border-transparent',
    disabled: 'disabled:from-red-300 disabled:to-red-400'
  },
  success: {
    base: 'bg-gradient-to-r from-green-600 to-green-700 text-white',
    hover: 'hover:from-green-700 hover:to-green-800',
    active: 'active:from-green-800 active:to-green-900',
    focus: 'focus:ring-green-500',
    border: 'border-transparent',
    disabled: 'disabled:from-green-300 disabled:to-green-400'
  },
  warning: {
    base: 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white',
    hover: 'hover:from-yellow-700 hover:to-yellow-800',
    active: 'active:from-yellow-800 active:to-yellow-900',
    focus: 'focus:ring-yellow-500',
    border: 'border-transparent',
    disabled: 'disabled:from-yellow-300 disabled:to-yellow-400'
  }
}

// Size styles mapping
const sizeStyles = {
  xs: {
    padding: 'px-2.5 py-1.5',
    text: 'text-xs',
    icon: 'text-sm',
    gap: 'gap-1'
  },
  sm: {
    padding: 'px-3 py-2',
    text: 'text-sm',
    icon: 'text-base',
    gap: 'gap-1.5'
  },
  md: {
    padding: 'px-4 py-2.5',
    text: 'text-sm',
    icon: 'text-lg',
    gap: 'gap-2'
  },
  lg: {
    padding: 'px-6 py-3',
    text: 'text-base',
    icon: 'text-xl',
    gap: 'gap-2'
  },
  xl: {
    padding: 'px-8 py-4',
    text: 'text-lg',
    icon: 'text-2xl',
    gap: 'gap-3'
  }
}

// Rounded styles mapping
const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full'
}

// Loading spinner component
function LoadingSpinner({ size = 'md' }: { size?: ButtonSize }) {
  const spinnerSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  }

  return (
    <svg
      className={`animate-spin ${spinnerSizes[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

// Main Button Component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      href,
      fullWidth = false,
      rounded = 'md',
      shadow = true,
      animate = true,
      className = '',
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Get variant styles
    const variantStyle = variantStyles[variant]
    
    // Get size styles
    const sizeStyle = sizeStyles[size]
    
    // Get rounded style
    const roundedStyle = roundedStyles[rounded]

    // Base classes
    const baseClasses = `
      inline-flex items-center justify-center
      font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
      disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
      ${shadow ? 'shadow-lg shadow-black/25' : ''}
      ${animate ? 'hover:scale-105 active:scale-95' : ''}
    `

    // Combine all classes
    const combinedClasses = `
      ${baseClasses}
      ${variantStyle.base}
      ${variantStyle.hover}
      ${variantStyle.active}
      ${variantStyle.focus}
      ${variantStyle.border}
      ${variantStyle.disabled}
      ${sizeStyle.padding}
      ${sizeStyle.text}
      ${roundedStyle}
      ${className}
    `.replace(/\s+/g, ' ').trim()

    // Content with icons and loading state
    const content = (
      <>
        {isLoading && (
          <span className={sizeStyle.icon}>
            <LoadingSpinner size={size} />
          </span>
        )}
        {!isLoading && leftIcon && (
          <span className={sizeStyle.icon}>{leftIcon}</span>
        )}
        <span>
          {isLoading && loadingText ? loadingText : children}
        </span>
        {!isLoading && rightIcon && (
          <span className={sizeStyle.icon}>{rightIcon}</span>
        )}
      </>
    )

    // If href is provided, render as Link
    if (href) {
      return (
        <Link
          href={href}
          className={combinedClasses}
          {...(props as any)}
        >
          {content}
        </Link>
      )
    }

    // Otherwise render as button
    return (
      <button
        ref={ref}
        type={type}
        className={combinedClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Icon Button Component (square button with only icon)
export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'loadingText'> {
  icon: React.ReactNode
  ariaLabel: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, ariaLabel, size = 'md', children, ...props }, ref) => {
    // Size to dimensions mapping
    const dimensions = {
      xs: 'w-8 h-8',
      sm: 'w-10 h-10',
      md: 'w-12 h-12',
      lg: 'w-14 h-14',
      xl: 'w-16 h-16'
    }

    return (
      <Button
        ref={ref}
        size={size}
        aria-label={ariaLabel}
        className={`${dimensions[size]} p-0 ${props.className || ''}`}
        {...props}
      >
        <span className="text-lg md:text-xl">{icon}</span>
      </Button>
    )
  }
)

IconButton.displayName = 'IconButton'

// Button Group Component
export interface ButtonGroupProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  attached?: boolean
  className?: string
}

export function ButtonGroup({
  children,
  orientation = 'horizontal',
  spacing = 'md',
  attached = false,
  className = ''
}: ButtonGroupProps) {
  // Spacing classes
  const spacingClasses = {
    none: orientation === 'horizontal' ? 'space-x-0' : 'space-y-0',
    sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    md: orientation === 'horizontal' ? 'space-x-3' : 'space-y-3',
    lg: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4'
  }

  // Attached button styles
  const attachedClasses = attached
    ? orientation === 'horizontal'
      ? '[&>button:not(:first-child)]:rounded-l-none [&>button:not(:last-child)]:rounded-r-none'
      : '[&>button:not(:first-child)]:rounded-t-none [&>button:not(:last-child)]:rounded-b-none'
    : ''

  return (
    <div
      className={`
        flex
        ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}
        ${!attached ? spacingClasses[spacing] : ''}
        ${attachedClasses}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

// Example usage and storybook-like documentation
export const ButtonStory = () => {
  return (
    <div className="space-y-8 p-8 bg-gray-900 rounded-2xl">
      {/* Variants */}
      <div className="space-y-4">
        <h3 className="text-white font-bold">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-white font-bold">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h3 className="text-white font-bold">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button leftIcon="←">Left Icon</Button>
          <Button rightIcon="→">Right Icon</Button>
          <Button leftIcon="👍" rightIcon="👎">Both Icons</Button>
          <IconButton icon="❤️" ariaLabel="Like" variant="danger" />
          <IconButton icon="⭐" ariaLabel="Favorite" variant="warning" />
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3 className="text-white font-bold">States</h3>
        <div className="flex flex-wrap gap-4">
          <Button isLoading>Loading</Button>
          <Button isLoading loadingText="Saving...">
            Save
          </Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth>Full Width</Button>
        </div>
      </div>

      {/* Rounded */}
      <div className="space-y-4">
        <h3 className="text-white font-bold">Rounded</h3>
        <div className="flex flex-wrap gap-4">
          <Button rounded="none">None</Button>
          <Button rounded="sm">Small</Button>
          <Button rounded="md">Medium</Button>
          <Button rounded="lg">Large</Button>
          <Button rounded="full">Full</Button>
        </div>
      </div>

      {/* Button Groups */}
      <div className="space-y-4">
        <h3 className="text-white font-bold">Button Groups</h3>
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
        
        <ButtonGroup attached>
          <Button variant="primary">Save</Button>
          <Button variant="primary">Edit</Button>
          <Button variant="danger">Delete</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}