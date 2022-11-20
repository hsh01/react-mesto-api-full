import * as React from 'react';
import {useEffect, useState} from 'react';
import {Popup} from '../Popup';
import {ApiError} from "../../models/ApiError";

type Props = {
    title: string;
    name: string;
    onClose: () => void;
    isOpen?: boolean;
    buttonLabel?: string;
    children?: React.ReactNode;
    onSubmit: any;
    buttonDisabled?: boolean;
    submitting?: boolean;
    submitted?: boolean;
    submitError?: string;
    setErrors?: (data: any) => void;
};

export const PopupWithForm = ({
                                  title,
                                  name,
                                  children,
                                  onClose,
                                  onSubmit,
                                  buttonDisabled = true,
                                  isOpen = false,
                                  setErrors,
                                  buttonLabel = 'Сохранить'
                              }: Props) => {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        setSubmitting(false);
        setSubmitted(false);
        setSubmitError('');
    }, [isOpen]);

    function handleSubmit(e: any) {
        e.preventDefault();

        setSubmitting(true);
        onSubmit(e)
            .then(() => {
                setSubmitted(true);
            })
            .then(() => {
                setTimeout(() => {
                    onClose();
                }, 1000);
            })
            .catch((err: ApiError) => {
                setSubmitError(err.body ? err.body.message : err.toString());
                if (setErrors && err.body.validation) {
                    setErrors({
                        ...err.body.validation.body.keys.reduce((accum: Object, key: string) => ({
                            [key]: err.body.validation.body.message
                        }), {})
                    })
                }
                return Promise.reject(err);
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <form className='form' name={name} noValidate onSubmit={handleSubmit}>
                <h2 className='form__header'>{title}</h2>
                {children}
                <button
                    className={`form__submit${buttonDisabled === true ? ' form__submit_disabled' : ''}${
                        submitting ? ' form__submit_disabled form__submit_loading' : ''
                    }${submitted ? ' form__submit_disabled form__submit_loading-ok' : ''}`}
                    type='submit'
                >
                    {buttonLabel}
                </button>
                <span className='form__error'>{submitError ? submitError : ''}</span>
            </form>
        </Popup>
    );
};
