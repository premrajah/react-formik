import React, { useState } from 'react'
import { Formik, Form, Field, FastField, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // object schema validation
import TextError from './TextError';

const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
        facebook: "",
        twitter: ""
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
}

const savedValues = {
    name: "Prem",
    email: "email@email.com",
    channel: "Zinox",
    comments: "Comments",
    address: "Address",
    social: {
        facebook: "fb",
        twitter: "tw"
    },
    phoneNumbers: ["12345678", "87654321"],
    phNumbers: ["12345678", "87654321"],
}

const onSubmit = (values, onSubmitProps) => {
    console.log('form data ', values, onSubmitProps)


    onSubmitProps.setSubmitting(false); // re-enable submit button after api call
    onSubmitProps.resetForm();
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    channel: Yup.string().required('Required'),
    address: Yup.string().required('Required!'),
})

const validateComments = value => {
    let error;

    if (!value) {
        error = "Comments Required"
    }

    return error;
}
const validatePrimaryPhone = value => {
    let error;

    if (!value) {
        error = "Phone Required"
    }

    return error;
}

function YouTubeForm() {

    const [formValues, setFormValues] = useState(null)

    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        // validateOnChange={false}
        // validateOnBlur={false}
        // validateOnMount
        >
            {
                formik => {

                    return (

                        <Form>
                            <div className="form-control">
                                <label htmlFor="name">Name</label>
                                <Field type="text" id="name" name="name" placeholder="Name" />
                                <ErrorMessage name="name" component={TextError} />
                            </div>

                            <div className="form-control">
                                <label htmlFor="email">E-Mail</label>
                                <Field type="email" id="email" name="email" placeholder="E-Mail" />
                                <ErrorMessage name="email">
                                    {
                                        (errorMsg) => <div className="error">
                                            {errorMsg}
                                        </div>
                                    }
                                </ErrorMessage>
                            </div>

                            <div className="form-control">
                                <label htmlFor="channel">Channel</label>
                                <Field type="text" id="channel" name="channel" placeholder="Channel" />
                                <ErrorMessage name="channel" component={TextError} />

                            </div>

                            <div className="form-control">
                                <label htmlFor="comments">Comments</label>
                                <Field as="textarea" id="comments" name="comments" validate={validateComments} />
                                <ErrorMessage name="comments" component={TextError} />
                            </div>

                            <div className="form-control">
                                <label htmlFor="address">Address</label>
                                <FastField name="address">
                                    {
                                        (props) => {
                                            const { field, form, meta } = props;
                                            // console.log('render props ', props)
                                            return <div>
                                                <input type="text" id="address" {...field} />
                                                {(meta.touched && meta.error) && <div className="error">{meta.error}</div>}
                                            </div>
                                        }
                                    }
                                </FastField>
                            </div>

                            <div className="form-control">
                                <label htmlFor="facebook">Facebook</label>
                                <Field type="text" id="facebook" name="social.facebook" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="twitter">Twitter</label>
                                <Field type="text" id="twitter" name="social.twitter" />
                            </div>

                            <div className="form-control">
                                <label htmlFor="primaryPh">Primary Phone Number</label>
                                <Field type="text" id="primaryPh" name="phoneNumbers[0]" validate={validatePrimaryPhone} />
                                <ErrorMessage name="phoneNumbers[0]" component={TextError} />
                            </div>

                            <div className="form-control">
                                <label htmlFor="secondaryPh">Secondary Phone Number</label>
                                <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
                            </div>

                            <div className="form-control">
                                <label>List of phone numbers</label>
                                <FieldArray name="phNumbers">
                                    {
                                        (fieldArrayProps) => {
                                            const { push, remove, form } = fieldArrayProps;
                                            const { values } = form;
                                            const { phNumbers } = values;

                                            // console.log('form errors ', form.errors)
                                            // console.log('field array props ', fieldArrayProps);
                                            return <div>
                                                {
                                                    phNumbers.map((phNumber, index) => (
                                                        <div key={index}>
                                                            <Field name={`phNumbers[${index}]`} />
                                                            {
                                                                index > 0 && <button type="button" onClick={() => remove(index)}> - </button>
                                                            }
                                                            <button type="button" onClick={() => push("")}> + </button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                    }
                                </FieldArray>
                            </div>

                            {/* <button type="button" onClick={() => formik.validateField("comments")}>Validate Comments</button> */}
                            {/* <button type="button" onClick={() => formik.validateForm()}>Validate All</button> */}
                            {/* <button type="button" onClick={() => formik.setFieldTouched("comments")}>Visited Comments</button> */}
                            {/* <button type="button" onClick={() => formik.setTouched({
                                name: true,
                                email: true,
                                channel: true,
                            })}>Visited All</button> */}
                            <button type="button" onClick={() => setFormValues(savedValues)}>Load Saved Data</button>
                            <button type="reset">Reset</button>
                            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>

                        </Form>
                    )
                }
            }

        </Formik>
    )
}

export default YouTubeForm
