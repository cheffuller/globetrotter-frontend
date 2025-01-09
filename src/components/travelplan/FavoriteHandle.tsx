import React from 'react'

interface FavoriteButtonProps {
    isFavorited: boolean;
    onToggleFavorite: (favored : boolean) => void;
}

const FavoriteHandle : React.FC<FavoriteButtonProps> = ({ isFavorited, onToggleFavorite }) => {
    const handleClick = () => {
        onToggleFavorite(!isFavorited);
    };

  return (
    <button onClick={handleClick} className={isFavorited ? 'btn btn-outline-warning' : 'btn btn-warning'}>
        {isFavorited ? 'Unfavorite' : 'Favorite'}
    </button>

  )
}

export default FavoriteHandle;