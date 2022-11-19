import * as React from 'react';
import {useEffect} from 'react';
import {Router} from "../../router";
import {useAuth} from "../../contexts/AuthContext";

type Props = {
    menu?: any;
};

export const Header: React.FC<Props> = ({menu}) => {

    const {user, logout} = useAuth();

    const [menuIsOpen, setMenuIsOpen] = React.useState(false);

    useEffect(() => {
        function closeByEscape(evt: KeyboardEvent) {
            if (evt.key === 'Escape') {
                setMenuIsOpen(false);
            }
        }

        if (menuIsOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            };
        }
    }, [menuIsOpen]);

    function handleToggleMenu() {
        setMenuIsOpen(!menuIsOpen);
    }

    return (
        <header className={`header${menuIsOpen ? ' header_opened' : ''}`}>
            <a className='header__logo' href={Router.HOME}/>

            {
                user ? (
                        <>
                            <div className={`header__menu${menuIsOpen ? ' header__menu_opened' : ''}`}>
                                <>
                                    <p className='header__menu-item'>{user.email}</p>
                                    <button className='header__menu-item header__menu-item_signout'
                                            onClick={() => logout()}>
                                        Выйти
                                    </button>
                                </>
                            </div>
                            <button className={`header__menu-button${menuIsOpen ? ' header__menu-button_opened' : ''}`}
                                    type="button"
                                    aria-label="кнопка меню"
                                    onClick={handleToggleMenu}/>
                        </>
                    )
                    : <div className='header__menu'>{menu}</div>
            }
        </header>
    );
};