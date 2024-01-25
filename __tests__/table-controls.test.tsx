import { render, fireEvent, screen } from '@testing-library/react'
import TableControls from '../src/components/table-controls'
import { SortBy } from '@/types'

describe('TableControls', () => {
  it('calls the appropriate functions when buttons are clicked or input is changed', () => {
    const toggleTableStyle = jest.fn()
    const toggleSortByCountry = jest.fn()
    const handleResetValues = jest.fn()
    const setFilterByCountry = jest.fn()

    render(
      <TableControls
        sort={SortBy.COUNTRY}
        toggleTableStyle={toggleTableStyle}
        toggleSortByCountry={toggleSortByCountry}
        handleResetValues={handleResetValues}
        setFilterByCountry={setFilterByCountry}
      />
    )

    fireEvent.click(screen.getByText('Colorear filas'))
    expect(toggleTableStyle).toHaveBeenCalled()

    fireEvent.click(screen.getByText('Reestablecer usuarios'))
    expect(handleResetValues).toHaveBeenCalled()

    fireEvent.change(screen.getByPlaceholderText('Filtrar por país'), {
      target: { value: 'USA' },
    })
    expect(setFilterByCountry).toHaveBeenCalledWith('USA')
  })
})
