import { TitleProps } from '@/types'

const Title = ({ level = 1, children, className }: TitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag className={`${className} text-2xl md:text-4xl font-semibold`}>
      {children}
    </Tag>
  )
}

export default Title
