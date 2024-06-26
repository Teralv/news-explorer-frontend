import React from 'react';


export default function NewsCard(props) {

  const isSaved = !props.savedArticlesArray || props.savedArticlesArray.length === 0 ? false : props.savedArticlesArray.some((article) => article.link === props.card.url);
  const keywordClass = props.isSearchResults ? '' : 'newsCard__keyword_active';
  const iconClass = props.isSearchResults ? 'newsCard__bookmark-icon' : 'newsCard__trash-icon';
  const iconWrapperClass = props.isSearchResults ? '' : 'newsCard__righthand-container_delete';
  const bookmarkActiceClass = isSaved ? 'newsCard__bookmark-icon_active' : '';
  const infotipActiveClass = iconClass === 'newsCard__trash-icon' ? 'newsCard__infotip_active' : props.isLoggedIn ? '' : 'newsCard__infotip_active';
  const infotipText = props.isLoggedIn ? 'Eliminar de favoritos' : 'Inicia sesión para guardar artículos';

  const getCardDate = () => {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const literalDate = new Date(props.card.publishedAt || props.card.date);
    const month = months[literalDate.getMonth()];
    const day = literalDate.getDay();
    const year = literalDate.getUTCFullYear();
    const cardDate = day + ' de ' + month + ' del ' + year;
    return cardDate;
  }

  const finalDate = getCardDate().toString();

  function handleIconClick(evt) {
    if (props.isLoggedIn) {
      if (iconClass === 'newsCard__bookmark-icon') {
        if (!isSaved) {

          return props.onClickSave({ article: props.card, keyword: props.keyword });
        } else {
          const currentArticle = props.savedArticlesArray.find((article) => article.link === props.card.url);

          return props.onClickDelete(currentArticle._id);
        }
      } else {
        props.onClickDelete(props.card._id);

      }
    } else {
      props.openSigninPopup();
    }
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')

    if (newWindow) newWindow.opener = null
  }

  return (
    <div className='newsCard'>
      <div className='newsCard__image-container' style={{ background: `url(${props.card.urlToImage || props.card.image}) no-repeat center/cover` }}>
        <div className={`newsCard__keyword ${keywordClass}`}>{props.card.keyword}</div>
        <div className={`newsCard__righthand-container ${iconWrapperClass}`}>
          <div className={`newsCard__infotip ${infotipActiveClass}`}>
            <div className={'newsCard__infotip-text'}>{infotipText}</div>
          </div>
          <div className='newsCard__icon-container'>
            <div className={`${iconClass} ${bookmarkActiceClass}`} onClick={handleIconClick}></div>
          </div>
        </div>
      </div>
      <div className='newsCard__text-container' onClick={() => openInNewTab(props.card.link || props.card.url)}>
        <p className='newsCard__date'>{finalDate}</p>
        <h3 className='newsCard__title'>{props.card.title}</h3>
        <p className='newsCard__text'>{props.card.description || props.card.text}</p>
        <p className='newsCard__source'>{props.card.source.name || props.card.source}</p>
      </div>
    </div>
  )
}