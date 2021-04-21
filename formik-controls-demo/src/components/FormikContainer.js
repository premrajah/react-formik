import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import FormikControl from './FormikControl';

const dropdownOptions = [
    { key: "Select an Option", value: "" },
    { key: "OptionK 1", value: "OptionV 1" },
    { key: "OptionK 2", value: "OptionV 2" },
    { key: "OptionK 3", value: "OptionV 3" },
]

const radioOptions = [
    { key: "RadioK1", value: "RadioV1" },
    { key: "RadioK2", value: "RadioV2" },
    { key: "RadioK3", value: "RadioV3" },
]

const checkboxOptions = [
    { key: "CheckK1", value: "CheckV1" },
    { key: "CheckK2", value: "CheckV2" },
    { key: "CheckK3", value: "CheckV3" },
]

const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    radioOption: "",
    checkboxOption: [],
    birthDate: null,

}
const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    selectOption: Yup.string().required("Required"),
    radioOption: Yup.string().required("Required"),
    checkboxOption: Yup.array().min(1, "Required"),
    birthDate: Yup.date().required("Required").nullable(),
})

const onSubmit = values => {
    console.log('submited form data ', values)
    console.log("saved date ", JSON.parse(JSON.stringify(values)));
}


function FormikContainer() {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => <Form>

                    <FormikControl
                        control="input"
                        type="email"
                        label="E-mail"
                        name="email"
                        placeholder="enter email address"
                    />

                    <FormikControl
                        control="textarea"
                        label="Description"
                        name="description"
                    />

                    <FormikControl
                        control="select"
                        label="Select A Topic"
                        name="selectOption"
                        options={dropdownOptions}
                    />

                    <FormikControl
                        control="radio"
                        label="RADIO Topic"
                        name="radioOption"
                        options={radioOptions}
                    />

                    <FormikControl
                        control="checkbox"
                        label="CheckBox Topic"
                        name="checkboxOption"
                        options={checkboxOptions}
                    />

                    <FormikControl
                        control="date"
                        label="Date Of Birth"
                        name="birthDate"
                    />

                    <button type="submit">Submit</button>
                </Form>
            }
        </Formik>
    )
}

export default FormikContainer
