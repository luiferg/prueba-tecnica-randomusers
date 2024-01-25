'use client'
import { SortBy, UserProps } from '@/types'
import { Filter, Trash } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetUsers } from '@/data/get-users'
import TableControls from './table-controls'
import clsx from 'clsx'

const UsersTable = () => {
  const [tableStyle, setTableStyle] = useState(false)
  const [users, setUsers] = useState<UserProps[]>([])
  const [sort, setSort] = useState<SortBy>(SortBy.none)
  const [filterByCountry, setFilterByCountry] = useState<string | null>(null)
  // This could be optimzed by making a pagination system, but for this test is not needed.
  const { data, error, isLoading, refetch } = useGetUsers()

  // Using useEffect to set the users on the state
  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [])

  const toggleSortByCountry = () => {
    const newSortValue = sort === SortBy.none ? SortBy.country : SortBy.none
    setSort(newSortValue)
  }

  const toggleTableStyle = () => {
    setTableStyle(!tableStyle)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSort(sort)
  }
  // Using useCallback to avoid creating a new function on every render, optimization first!
  const createSortHandler = useCallback(
    (sortBy: SortBy) => () => {
      handleChangeSort(sortBy)
    },
    []
  )
  const handleDeleteUser = (email: string) => {
    const newUsers = users.filter((user) => user.email !== email)
    setUsers(newUsers)
  }

  const handleResetValues = () => {
    // So refetch function normal behavior is to make a new fetch,
    // but im using a seed so it will always return the same data.
    // Check https://randomuser.me/documentation#seeds for more info.
    refetch()
    setUsers(data || [])
  }

  // Using useMemo to avoid filtering the users on every render
  const filteredUsers = useMemo(() => {
    return filterByCountry != null && filterByCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterByCountry.toLowerCase())
        })
      : users
  }, [users, filterByCountry])

  // Using useMemo to avoid sorting the users on every render
  const sortedUsers = useMemo(() => {
    if (sort === SortBy.none) return filteredUsers

    // Extract the property to compare
    const compareProperties: Record<string, (user: UserProps) => any> = {
      [SortBy.country]: (user) => user.location.country,
      [SortBy.name]: (user) => user.name.first,
      [SortBy.last]: (user) => user.name.last,
    }

    // a and b are the users to compare
    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sort]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sort])

  // Handling error
  if (error) return <p>Error: {error.message}</p>
  // Handling loading
  if (isLoading) return <div>Loading...</div>

  // Handling users
  if (users)
    return (
      <section className='flex flex-col gap-5 w-full items-center'>
        <TableControls
          sort={sort}
          toggleTableStyle={toggleTableStyle}
          toggleSortByCountry={toggleSortByCountry}
          handleResetValues={handleResetValues}
          setFilterByCountry={setFilterByCountry}
        />
        <table className='flex flex-col gap-4 w-full text-center'>
          <thead>
            <tr className='grid grid-cols-5 w-full'>
              <th aria-label='Foto'>Foto</th>
              <th
                className='cursor-pointer'
                aria-label='Ordenar por nombre'
                onClick={createSortHandler(SortBy.name)}
              >
                Nombre
                {sort === SortBy.name && (
                  <Filter className='inline-block ml-2 text-sm' size={15} />
                )}
              </th>
              <th
                className='cursor-pointer'
                aria-label='Ordenar por apellido'
                onClick={createSortHandler(SortBy.last)}
              >
                Apellido
                {sort === SortBy.last && (
                  <Filter className='inline-block ml-2 text-sm' size={15} />
                )}
              </th>
              <th
                className='cursor-pointer'
                aria-label='Ordenar por país'
                onClick={createSortHandler(SortBy.country)}
              >
                País
                {sort === SortBy.country && (
                  <Filter className='inline-block ml-2' size={15} />
                )}
              </th>
              <th aria-label='Acciones'>Acciones</th>
            </tr>
          </thead>
          <tbody className='rounded-lg overflow-hidden'>
            {sortedUsers?.map(({ name, location, email, picture }, index) => (
              <tr
                key={email}
                className={clsx(
                  'grid grid-cols-5 w-full items-center py-2 px-4',
                  {
                    'bg-slate-800 text-white': tableStyle && index % 2 === 0,
                    'bg-slate-700 text-white': tableStyle && index % 2 !== 0,
                  }
                )}
              >
                <td className='content-center'>
                  <img
                    src={picture.medium}
                    alt={`Foto de ${name.first} ${name.last}`}
                    className='rounded-lg'
                  />
                </td>
                <td>{name.first}</td>
                <td>{name.last}</td>
                <td>{location.country}</td>
                <td>
                  <button
                    className='bg-red-600 p-1 text-3xl rounded-md text-white'
                    aria-label='Eliminar usuario'
                    onClick={() => handleDeleteUser(email)}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
}

export default UsersTable
