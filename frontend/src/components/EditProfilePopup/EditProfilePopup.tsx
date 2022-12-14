import * as React from 'react';
import {useEffect} from 'react';
import {PopupWithForm} from '../PopupWithForm';
import {Input} from '../Input';
import {useFormAndValidation} from '../../hooks/useFormAndValidation';
import {useAuth} from "../../contexts/AuthContext";
import {ApiError} from "../../models/ApiError";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onUpdateUser: (user: { name: string; about: string }) => Promise<any>;
};

export const EditProfilePopup = ({isOpen, onClose, onUpdateUser}: Props) => {
    const {user} = useAuth();
    const {values, handleChange, errors, setErrors, isValid, resetForm} = useFormAndValidation();

    const handleSubmit = () => {
        return onUpdateUser(values);
    };

    useEffect(() => {
        if (user) {
            const {name, about} = user;
            resetForm({name, about});
        }
    }, [user, isOpen, resetForm]);

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='edit_profile'
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            buttonDisabled={!isValid || (values.name === user?.name && values.about === user?.about)}
            setErrors={setErrors}>
            <fieldset className='form__set'>
                <Input
                    title='Имя:'
                    name='name'
                    minLength={2}
                    maxLength={40}
                    onChange={handleChange}
                    error={errors.name}
                    value={values.name}
                />
                <Input
                    title='О себе:'
                    name='about'
                    minLength={2}
                    maxLength={200}
                    onChange={handleChange}
                    error={errors.about}
                    value={values.about}
                />
            </fieldset>
        </PopupWithForm>
    );
};
