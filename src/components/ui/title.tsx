type TitleProps = {
  // The level of the title, from 1 to 6.
  level?: 1 | 2 | 3 | 4 | 5 | 6
  // The title content.
  children: React.ReactNode
  // Custom classes.
  className?: string
}

const Title = ({ level = 1, children, className }: TitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag className={`${className} text-2xl md:text-4xl font-semibold`}>
      {children}
    </Tag>
  )
}

export default Title
