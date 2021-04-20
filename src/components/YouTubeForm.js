import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // object schema validation

const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
}

const onSubmit = values => {
    console.log('form data ', values)
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    channel: Yup.string().required('Required'),
})

function YouTubeForm() {


    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <Field type="text" id="name" name="name" placeholder="Name" />
                    <ErrorMessage name="name" />
                </div>

                <div className="form-control">
                    <label htmlFor="email">E-Mail</label>
                    <Field type="email" id="email" name="email" placeholder="E-Mail" />
                    <ErrorMessage name="email" />
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <Field type="text" id="channel" name="channel" placeholder="Channel" />
                    <ErrorMessage name="channel" />

                </div>

                <div className="form-control">
                    <label htmlFor="comments">Comments</label>
                    <Field as="textarea" id="comments" name="comments" />
                </div>

                <div className="form-control">
                    <label htmlFor="address">Address</label>
                    <Field name="address">
                        {
                            (props) => {
                                const { field, form, meta } = props;
                                // console.log('render props ', props)
                                return <div>
                                    <input type="text" id="address" {...field} />
                                    {(meta.touched && meta.error) && <div>{meta.error}</div>}
                                </div>
                            }
                        }
                    </Field>
                </div>

                <button type="submit">Submit</button>

            </Form>
        </Formik>
    )
}

export default YouTubeForm
