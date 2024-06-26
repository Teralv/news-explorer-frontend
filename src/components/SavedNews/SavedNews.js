import React from 'react';
import NewsCardsList from '../NewsCardList/NewsCardList';

export default function SavedNews(props) {

  return (
    <main className='savedNews'>
      <div className='savedNews__container'>
        <NewsCardsList
          isLoggedIn={props.isLoggedIn}
          savedArticlesArray={props.savedArticlesArray}
          keyword={props.keyword}
          onClickDelete={props.onClickDelete}
          articleArray={props.savedArticlesArray}/>
      </div>
    </main>
  )
}