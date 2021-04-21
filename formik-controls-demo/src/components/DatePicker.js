import { ErrorMessage, Field } from 'formik';
import React from 'react'
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import TextError from './TextError';

function DatePicker(props) {

    const { label, name, ...rest } = props;

    return (
        <div className="form-control">
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} >
                {
                    ({ field, form }) => {
                        const { setFieldValue } = form;
                        const { value } = field;

                        return (
                            <DateView
                                id={name}
                                {...field}
                                {...rest}
                                selected={value}
                                onChange={(changedValue) => setFieldValue(name, changedValue)}
                            />
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default DatePicker
