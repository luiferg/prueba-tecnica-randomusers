export type TitleProps = {
  // The level of the title, from 1 to 6.
  level?: 1 | 2 | 3 | 4 | 5 | 6
  // The title content.
  children: React.ReactNode
  // Custom classes.
  className?: string
}

export interface ButtonProps {
  // Aria label for accessibility.
  ariaLabel: string
  // Function to be called when the button is clicked.
  onClick: () => void
  // The button content.
  children: React.ReactNode
}

export interface UserProps {
  // The user data.
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
  // The current sort value.
  sort: SortBy
  // Function for style change.
  toggleTableStyle: () => void
  // Function for sort by country.
  toggleSortByCountry: () => void
  // Function to reset users.
  handleResetValues: () => void
  // Function for sort by country with input.
  setFilterByCountry: (value: string) => void
}

export enum SortBy {
  // No sort.
  none = 'none',
  // Sort by first name.
  name = 'name',
  // Sort by last name.
  last = 'last',
  // Sort by country.
  country = 'country',
}
