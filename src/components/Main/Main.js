import React from 'react';
import NewsCardsList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import PageNotFound from '../PageNotFound/PageNotFound';

export default function Main(props) {

  const [isShowMore, setIsShowMore] = React.useState(false);

  const buttonText = isShowMore ? 'Ver menos' : 'Ver más';

  function handleButtonClick() {
    if (!isShowMore) {
        setIsShowMore(true);
    } else {
        setIsShowMore(false);
    }
  }

  return (
    <main className='main'>
      {props.isSearch ?
        props.isLoading ? <Preloader /> :
          props.isSearchResults ?
            <div className='main__container'>
              <h2 className='main__header'>Resultados de la búsqueda</h2>
              <div className='main__news-container'>
                  <NewsCardsList
                    isSearchResults={props.isSearchResults}
                    isLoggedIn={props.isLoggedIn}
                    newsArticleArray={props.newsArticleArray}
                    isShowMore={isShowMore}/>
                  <button type='button' className='main__button' onClick={handleButtonClick}>{buttonText}</button>
              </div>
            </div>
            :
            <PageNotFound /> : ''}
      {props.children}
      <About />
    </main>
  )
}