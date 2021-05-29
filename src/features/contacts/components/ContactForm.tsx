import React from 'react'
import { Form, Button } from 'antd'
import { Field, Formik } from 'formik'
import * as Yup from 'yup'
import { AntInput, AntInputNumber } from 'components/CreateAntdFields'
import { ContactInput } from '../contactsSlice'

const stringContraint = Yup.string()
  .max(30, 'Must be 30 characters or less')
  .min(3, 'Must be 3 characters or more')
  .required('Required')
const numberContraint = Yup.number()
  .min(0, 'Should be more than 0')
  .required('Required')

const validationSchema = Yup.object({
  name: stringContraint,
  lastname: stringContraint,
  age: numberContraint,
  pager: numberContraint,
})

export interface ContactFormProps {
  handleSubmit: (values: ContactInput) => void
  initialValues: ContactInput
}

const ContactForm: React.FC<ContactFormProps> = ({
  handleSubmit,
  initialValues,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    enableReinitialize
  >
    {({ handleSubmit }) => (
      <Form
        layout="vertical"
        className="form-container"
        onFinish={handleSubmit}
      >
        <Field
          component={AntInput}
          name="name"
          type="text"
          label="Name"
          hasFeedback
        />

        <Field
          component={AntInput}
          name="lastname"
          type="text"
          label="Last Name"
          hasFeedback
        />

        <Field component={AntInputNumber} name="age" label="Age" hasFeedback />

        <Field
          component={AntInputNumber}
          name="pager"
          label="Pager"
          hasFeedback
        />

        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form>
    )}
  </Formik>
)

export default ContactForm
