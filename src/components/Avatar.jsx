import { getAvatarColor, getInitials } from '../utils/avatar'

export default function Avatar({ name, seed, size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  }
  const bg = getAvatarColor(seed || name)
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${sizes[size]} ${className}`}
      style={{ backgroundColor: bg }}
      aria-hidden={!name}
      title={name}
    >
      {getInitials(name)}
    </div>
  )
}
