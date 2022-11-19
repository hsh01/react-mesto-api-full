import React, {useCallback, useEffect, useState} from 'react';
import {CardModel} from '../../models/CardModel';
import {Header} from '../../components/Header';
import {AddPlacePopup} from '../../components/AddPlacePopup';
import {Footer} from '../../components/Footer';
import {EditProfilePopup} from '../../components/EditProfilePopup';
import {api} from '../../utils/api';
import {EditAvatarPopup} from '../../components/EditAvatarPopup';
import {ImagePopup} from '../../components/ImagePopup';
import {Main} from '../../components/Main';
import {RemovePlacePopup} from '../../components/RemovePlacePopup';
import {useAuth} from "../../contexts/AuthContext";

function Home() {
    const {user, setUser} = useAuth();

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState<boolean>(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState<boolean>(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState<boolean>(false);
    const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);
    const [removeCard, setRemoveCard] = useState<string | null>(null);

    const [cards, setCards] = useState<CardModel[]>([]);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleRemovePlaceClick = (cardId: string) => {
        setRemoveCard(cardId);
        setIsRemovePlacePopupOpen(true);
    };

    const closeAllPopups = useCallback(() => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsRemovePlacePopupOpen(false);
        setSelectedCard(null);
    }, []);

    const handleCardClick = (card: CardModel) => {
        setSelectedCard(card);
    };

    function handleCardLike(card: CardModel) {
        const isLiked = card.likes!.some((id) => id === user?._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => console.log(err));
    }

    function handleCardRemove(cardId: string) {
        return api.deleteCard(cardId!).then(
            () => {
                setCards((state) => state.filter((c) => c._id !== cardId));
            },
            (err) => {
                console.log(err);
            }
        );
    }

    const handleAddPlaceSubmit = (card: CardModel) => {
        return api.postCard(card).then(
            (card) => setCards([card, ...cards]),
            (err) => {
                console.log(err);
            }
        );
    };

    const handleUpdateUser = (user: { name: string | undefined; about: string | undefined }) => {
        return api.patchUserInfo(user).then(
            (user) => setUser(user),
            (err) => {
                console.log(err);
            }
        );
    };

    const handleUpdateAvatar = (user: { avatar: string }) => {
        return api.patchUserAvatar(user).then(
            (user) => setUser(user),
            (err) => {
                console.log(err);
            }
        );
    };

    useEffect(() => {
        api.getCards().then(setCards);
    }, []);

    return (
        <>
            <Header/>
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                handleCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardRemove={handleRemovePlaceClick}
            />
            <Footer/>
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardAdd={handleAddPlaceSubmit}/>
            <RemovePlacePopup
                isOpen={isRemovePlacePopupOpen}
                onClose={closeAllPopups}
                onCardRemove={handleCardRemove}
                cardId={removeCard!}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </>
    );
}

export {Home};
