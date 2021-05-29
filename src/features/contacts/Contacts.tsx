import React, { useEffect, useState } from 'react'
import { Button, PageHeader } from 'antd'
import ContactModal from './components/ContactModal'
import ContactsTable from './components/ContactsTable'
import { Contact } from './contactsSlice'

const Contacts = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [contactToEdit, setContactToEdit] =
    useState<Contact | undefined>(undefined)

  useEffect(() => {
    if (!isCreateModalVisible) {
      setContactToEdit(undefined)
    }
  }, [isCreateModalVisible])

  const toggleIsCreateModal = () =>
    setIsCreateModalVisible(!isCreateModalVisible)

  const onContactEdit = (contact: Contact) => {
    setContactToEdit(contact)
    toggleIsCreateModal()
  }

  return (
    <>
      <PageHeader
        backIcon={false}
        title="Contacts"
        extra={[
          <Button key="1" type="primary" onClick={toggleIsCreateModal}>
            Add new contact
          </Button>,
        ]}
      />
      <ContactsTable handleContactEdit={onContactEdit} />
      <ContactModal
        visible={isCreateModalVisible}
        toggle={toggleIsCreateModal}
        contact={contactToEdit}
      />
    </>
  )
}

export default Contacts
