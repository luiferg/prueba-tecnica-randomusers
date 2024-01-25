import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Button from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Button ariaLabel='Test button' onClick={() => {}}>
        Test
      </Button>
    )
    expect(getByText('Test')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn()
    const { getByText } = render(
      <Button ariaLabel='Test button' onClick={mockOnClick}>
        Test
      </Button>
    )
    fireEvent.click(getByText('Test'))
    expect(mockOnClick).toHaveBeenCalled()
  })
})
