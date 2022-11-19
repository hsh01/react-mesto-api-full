import * as React from 'react';
import {CardModel} from '../../models/CardModel';
import {useAuth} from "../../contexts/AuthContext";

type Props = {
    card: CardModel;
    onCardClick: (card: CardModel) => void;
    onCardLike: (card: CardModel) => void;
    onCardRemove: (cardId: string) => void;
};

export const Card = ({card, onCardClick, onCardLike, onCardRemove}: Props) => {
    const {user} = useAuth();
    const isOwn = card.owner === user?._id;
    const isLiked = card.likes!.some((id) => id === user?._id);
    const cardLikeButtonClassName = `place__like ${isLiked ? 'place__like_active' : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    return (
        <article className='place'>
            <img className='place__image' src={card.link} alt={card.name} onClick={handleClick} />
            <div className='place__list'>
                <h2 className='place__title'>{card.name}</h2>
                <div className='place__like-wrapper'>
                    <button
                        className={cardLikeButtonClassName}
                        type='button'
                        aria-label='лайк'
                        onClick={() => onCardLike(card)}
                    />
                    <span className='place__like-counter'>{card.likes!.length}</span>
                </div>
            </div>
            {isOwn && (
                <button
                    className='place__remove'
                    type='button'
                    aria-label='удалить'
                    onClick={() => onCardRemove(card._id!)}
                />
            )}
        </article>
    );
};
