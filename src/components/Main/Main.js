import React from 'react';
import NewsCardsList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import PageNotFound from '../PageNotFound/PageNotFound';

export default function Main(props) {

  const [arrayLength, setArrayLength] = React.useState(3);
  const [isShowMore, setIsShowMore] = React.useState(false);
  const newsArticles = props.newsArticleArray;
  const savedArticles = props.savedArticlesArray;
  const arrayType = props.isSearchResults ? newsArticles : savedArticles;
  const articleArray = arrayType === savedArticles ? savedArticles : newsArticles.slice(0, arrayLength);

  const buttonText = isShowMore ? 'Ver menos' : 'Ver más';

  React.useEffect(() => {
    setArrayLength(3);
    setIsShowMore(false);
  }, [newsArticles])

  React.useEffect(() => {
    if (arrayLength >= newsArticles.length) {
      setIsShowMore(true)
    }
  }, [arrayLength, newsArticles.length])

  function handleButtonClick() {
    if (arrayLength < newsArticles.length) {
      setArrayLength(arrayLength + 3);
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
                    onClickSave={props.onClickSave}
                    keyword={props.keyword}
                    onClickDelete={props.onClickDelete}
                    savedArticlesArray={savedArticles}
                    articleArray={articleArray}
                    openSigninPopup={props.openSigninPopup}/>
                  <button type='button' className='main__button' onClick={handleButtonClick}>{buttonText}</button>
              </div>
            </div>
            :
            <PageNotFound isServerError={props.isServerError}/> : ''}
      {props.children}
      <About />
    </main>
  )
}