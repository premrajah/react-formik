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
    });

    // console.log('form values ', formik.values);
    // console.log('form errors ', formik.errors);
    // console.log('touched fields ', formik.touched);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Name" {...formik.getFieldProps('name')} />
                    {(formik.touched.name && formik.errors.name) && <div className="error">{formik.errors.name}</div>}
                </div>

                <div className="form-control">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email" id="email" name="email" placeholder="E-Mail" {...formik.getFieldProps('email')} />
                    {(formik.touched.email && formik.errors.email) && <div className="error">{formik.errors.email}</div>}
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel" name="channel" placeholder="Channel" {...formik.getFieldProps('channel')} />
                    {(formik.touched.channel && formik.errors.channel) && <div className="error">{formik.errors.channel}</div>}

                </div>

                <button type="submit">Submit</button>

            </form>
        </div>
    )
}

export default YouTubeForm
