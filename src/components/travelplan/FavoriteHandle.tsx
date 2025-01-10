import React from 'react'
// import './buttons.css'

interface FavoriteButtonProps {
    isFavorited: boolean;
    onToggleFavorite: (favored : boolean) => void;
}

const FavoriteHandle : React.FC<FavoriteButtonProps> = ({ isFavorited, onToggleFavorite }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggleFavorite(e.target.checked);
    };

  return (
    <label className="favorite-button">
      <input
        type="checkbox"
        checked={isFavorited}
        onChange={handleChange}
        className="hide-checkbox" // Hide the default checkbox
      />
      <i
        className={`fa ${isFavorited ? 'fa-star' : 'fa-star-o'}`} // Use Font Awesome icons
        style={{ color: isFavorited ? '#F8AB91' : '#ccc', fontSize: '24px' }}
      ></i>
    </label>
  )
}

export default FavoriteHandle;