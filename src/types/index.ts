export interface ButtonProps {
  ariaLabel: string
  onClick: () => void
  children: React.ReactNode
}

export interface UserProps {
  name: {
    first: string
    last: string
  }
  location: {
    country: string
  }
  picture: {
    medium: string
  }
  email: string
}

export interface TableControlsProps {
  sort: SortBy
  toggleTableStyle: () => void
  toggleSortByCountry: () => void
  handleResetValues: () => void
  setFilterByCountry: (value: string) => void
}

export enum SortBy {
  NONE = 'none',
  NAME = 'name',
  LAST = 'last',
  COUNTRY = 'country',
}
