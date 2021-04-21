import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl';

function LoginForm() {

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string().required("Required")
    })

    const onSubmit = values => {
        console.log('form data ', values);
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => {
                    return <Form>

                        <FormikControl
                            control="input"
                            type="email"
                            name="email"
                            label="E-Mail"
                            placeholder="Please enter email"
                        />

                        <FormikControl
                            control="input"
                            type="password"
                            name="password"
                            label="Password"
                        />

                        <button type="submit" disabled={!formik.isValid}>Login</button>

                    </Form>
                }
            }
        </Formik>
    )
}

export default LoginForm
