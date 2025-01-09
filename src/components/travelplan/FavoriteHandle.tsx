import React from 'react'

interface FavoriteButtonProps {
    isFavorited: boolean;
    onToggleFavorite: (favored : boolean) => void;
}

const FavoriteHandle : React.FC<FavoriteButtonProps> = ({ isFavorited, onToggleFavorite }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggleFavorite(e.target.checked);
    };

  return (
    <label>
        <input
            type="checkbox"
            checked={isFavorited}
            onChange={handleChange}
        />
        {isFavorited ? "Favorited" : "Not Favorited"}
      </label>

  )
}

export default FavoriteHandle;