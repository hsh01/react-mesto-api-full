import React, {useEffect, useState} from 'react';
import {ApiError} from "../../models/ApiError";

type Props = {
    title: string;
    name: string;
    isOpen?: boolean;
    buttonLabel?: string;
    children?: React.ReactNode;
    onSubmit: any;
    buttonDisabled?: boolean;
    submitting?: boolean;
    submitted?: boolean;
    submitError?: string;
    setErrors: (data: any) => void;
};

export const SignForm = ({
    title,
    name,
    children,
    onSubmit,
    buttonDisabled = true,
    isOpen = false,
    setErrors,
    buttonLabel = 'Войти'
}: Props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [isOpen]);

    function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        onSubmit(e)
            .catch((err: ApiError) => {
                if (err.body.validation) {
                    setErrors({
                        ...err.body.validation.body.keys.reduce((accum: Object, key: string) => ({
                            [key]: err.body.validation.body.message
                        }), {})
                    })
                }
            })
            .finally(() => setLoading(false));
    }

    return (
        <form className='form form_dark' name={name} noValidate onSubmit={handleSubmit}>
            <h2 className='form__header form__header_center'>{title}</h2>
            {children}
            <button
                className={
                    `form__submit form__submit_sign` +
                    `${buttonDisabled ? ' form__submit_disabled' : ''}` +
                    `${loading ? ' form__submit_loading' : ''}`
                }
                type='submit'
            >
                {buttonLabel}
            </button>
        </form>
    );
};
