import React from 'react';
import './rating-component.scss'

interface Props {
  value: number;
  text: string;
}

const MIN_STARS = 1;
const MAX_STARS = 5;

const RatingComponent: React.FC<Props> = ({ value, text }) => {

  const ratings = [];
  for(let i = MIN_STARS; i <= MAX_STARS; i++) {
    let cssClasses = `${
      value > i
        ? 'fas fa-star'
        : value >= i - 0.5
        ? 'fas fa-star-half-alt'
        : 'far fa-star'
    }`
    ratings.push(
      <span>
        <i className={'rating__icon-color ' + cssClasses}/>
      </span>
    )
  }

  return (
    <div className='rating'>
      {ratings}
      <span>{text && text}</span>
    </div>
  );
};

export default RatingComponent;
