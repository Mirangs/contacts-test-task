import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import ContactForm from './ContactForm'
import {
  addContact,
  ContactInput,
  contactsSelector,
  editContact,
} from '../contactsSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'

export interface ContactModalProps {
  visible: boolean
  contact?: ContactInput
  toggle: () => void
}

const initialFormValues: ContactInput = {
  name: '',
  lastname: '',
  age: 1,
  pager: 1,
}

const ContactModal: React.FC<ContactModalProps> = ({
  visible,
  contact,
  toggle,
}) => {
  const contacts = useAppSelector(contactsSelector)
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const modalTitle = `${isEditing ? 'Edit' : 'Create'} contact`

  useEffect(() => setIsEditing(!!contact), [contact])

  const onSubmit = (values: ContactInput) => {
    const lastId = contacts.length
    const funcToDispatch = isEditing ? editContact : addContact
    dispatch(funcToDispatch({ id: lastId, ...values }))
    toggle()
  }

  return (
    <Modal title={modalTitle} visible={visible} onCancel={toggle} footer={null}>
      <ContactForm
        initialValues={contact || initialFormValues}
        handleSubmit={onSubmit}
      />
    </Modal>
  )
}

export default ContactModal
