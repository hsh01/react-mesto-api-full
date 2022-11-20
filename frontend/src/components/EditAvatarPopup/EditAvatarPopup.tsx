import * as React from 'react';
import {useEffect} from 'react';
import {PopupWithForm} from '../PopupWithForm';
import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {Input} from "../Input";
import {useAuth} from "../../contexts/AuthContext";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onUpdateAvatar: (user: { avatar: string }) => void;
};

export const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}: Props) => {

    const {user} = useAuth();
    const {values, handleChange, errors, setErrors, isValid, resetForm} = useFormAndValidation();

    function handleSubmit() {
        return onUpdateAvatar(values);
    }

    useEffect(() => {
        if (user) {
            const {avatar} = user;
            resetForm({avatar});
        }
    }, [user, isOpen, resetForm]);

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='edit_avatar'
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            buttonDisabled={!isValid || (values.avatar === user?.avatar)}
            setErrors={setErrors}
        >
            <fieldset className='form__set'>
                <Input
                    title='Имя:'
                    name='avatar'
                    type='url'
                    required={true}
                    onChange={handleChange}
                    error={errors.avatar}
                    value={values.avatar}
                />
            </fieldset>
        </PopupWithForm>
    );
};
