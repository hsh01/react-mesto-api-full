import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {PopupWithForm} from '../PopupWithForm';
import {Input} from '../Input';
import {useFormAndValidation} from '../../hooks/useFormAndValidation';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCardAdd: (card: any) => Promise<any>;
};

export const AddPlacePopup = ({isOpen, onClose, onCardAdd}: Props) => {
    const {values, handleChange, errors, setErrors, isValid, resetForm} = useFormAndValidation();

    const initialValues = useMemo(() => {
        return {name: '', link: ''};
    }, []);

    useEffect(() => {
        resetForm(initialValues);
    }, [resetForm, initialValues, isOpen]);

    const handleSubmit = () => {
        return onCardAdd(values);
    };

    return (
        <PopupWithForm
            title='Новое место'
            name='add_place'
            buttonLabel='Создать'
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            buttonDisabled={!(isValid && values.name && values.link)}
            setErrors={setErrors}
        >
            <fieldset className='form__set'>
                <Input
                    title='Название:'
                    name='name'
                    minLength={2}
                    maxLength={30}
                    onChange={handleChange}
                    error={errors.name}
                    value={values.name}
                />
                <Input
                    title='Ссылка на картинку:'
                    name='link'
                    type='url'
                    onChange={handleChange}
                    error={errors.link}
                    value={values.link}
                />
            </fieldset>
        </PopupWithForm>
    );
};
