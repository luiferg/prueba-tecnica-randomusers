'use client'

import { TableControlsProps, SortBy } from '@/types'
import { Filter } from 'lucide-react'
import Button from './ui/button'

const TableControls = ({
  sort,
  toggleTableStyle,
  toggleSortByCountry,
  handleResetValues,
  setFilterByCountry,
}: TableControlsProps) => {
  return (
    <div className='grid grid-row-2 grid-cols-3 md:flex md:flex-row gap-4'>
      <Button ariaLabel='Colorear filas' onClick={toggleTableStyle}>
        Colorear filas
      </Button>

      <Button ariaLabel='Ordenar por país' onClick={toggleSortByCountry}>
        {sort === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        {sort === SortBy.COUNTRY && (
          <Filter className='inline-block ml-2' size={15} />
        )}
      </Button>

      <Button ariaLabel='Reestablecer usuarios' onClick={handleResetValues}>
        Reestablecer usuarios
      </Button>
      <input
        className='col-span-3 rounded-lg p-2 border border-slate-900 bg-slate-100 text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-offset-slate-100'
        aria-label='Filtrar por país'
        placeholder='Filtrar por país'
        onChange={(e) => setFilterByCountry(e.target.value)}
      />
    </div>
  )
}

export default TableControls
