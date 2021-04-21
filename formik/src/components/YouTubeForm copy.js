import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'; // object schema validation

const initialValues = {
    name: "",
    email: "",
    channel: "",
}

const onSubmit = values => {
    console.log('form data ', values)
}

const validate = values => {
    // returns an object, keys should match form field, value shoue be a string
    let errors = {};

    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email format"
    }

    if (!values.channel) {
        errors.channel = 'Required'
    }

    return errors;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    channel: Yup.string().required('Required'),
})

function YouTubeForm() {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        // validate,
    });

    // console.log('form values ', formik.values);
    // console.log('form errors ', formik.errors);
    // console.log('touched fields ', formik.touched);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Name" onBlur={formik.handleBlur} />
                    {(formik.touched.name && formik.errors.name) && <div className="error">{formik.errors.name}</div>}
                </div>

                <div className="form-control">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="E-Mail" onBlur={formik.handleBlur} />
                    {(formik.touched.email && formik.errors.email) && <div className="error">{formik.errors.email}</div>}
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel" name="channel" onChange={formik.handleChange} value={formik.values.channel} placeholder="Channel" onBlur={formik.handleBlur} />
                    {(formik.touched.channel && formik.errors.channel) && <div className="error">{formik.errors.channel}</div>}

                </div>

                <button type="submit">Submit</button>

            </form>
        </div>
    )
}

export default YouTubeForm
