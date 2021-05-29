import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Contact, contactsSelector, removeContact } from '../contactsSlice'
import { Button } from 'antd'
import { Column, useTable, Cell } from 'react-table'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import '../Contacts.scss'

type OnContactEdit = (contact: Contact) => void
type OnContactDelete = (id: number) => void
type GetColumns = (
  onContactEdit: OnContactEdit,
  onContactDelete: OnContactDelete
) => Column<Contact>[]

const getColumns: GetColumns = (onContactEdit, onConctactDelete) => [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Last Name',
    accessor: 'lastname',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Pager',
    accessor: 'pager',
  },
  {
    Header: 'Edit',
    Cell(cell: Cell<Contact>) {
      const {
        row: { original },
      } = cell

      return (
        <Button icon={<EditOutlined />} onClick={() => onContactEdit(original)}>
          Edit
        </Button>
      )
    },
  },
  {
    Header: 'Delete',
    accessor: 'id',
    Cell(cell: Cell<Contact>) {
      return (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => onConctactDelete(cell.value)}
        >
          Remove
        </Button>
      )
    },
  },
]

export interface ContactsTableProps {
  handleContactEdit: (contact: Contact) => void
}

const ContactsTable: React.FC<ContactsTableProps> = ({ handleContactEdit }) => {
  const contacts = useAppSelector(contactsSelector)
  const dispatch = useAppDispatch()
  const tableColumns = useMemo(
    () =>
      getColumns(
        (contact) => handleContactEdit(contact),
        (id) => dispatch(removeContact(id))
      ),
    [dispatch, handleContactEdit]
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumns,
      data: contacts,
    })

  if (contacts.length === 0) {
    return <h2>There is no contacts</h2>
  }

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ContactsTable
