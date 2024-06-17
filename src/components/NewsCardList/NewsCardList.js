import React from 'react';
import { nanoid } from 'nanoid';

import NewsCard from '../NewsCard/NewsCard';

export default function NewsCardsList(props) {

  const arrayType = props.isSearchResults ?  props.newsArticleArray : props.savedArticlesArray
  const arrayLength = props.isShowMore ? arrayType : arrayType.slice(0, 3);

  return (
    <section className='newsCardsList'>
      <ul className='newsCardsList__list'>
        {arrayLength.map((card) => (
          <NewsCard
            key={nanoid()}
            card={card}
            isSearchResults={props.isSearchResults}
            isLoggedIn={props.isLoggedIn}
          />
        ))}
      </ul>
    </section>
  )
}