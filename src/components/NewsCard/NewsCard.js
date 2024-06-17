import React from 'react';


export default function NewsCard(props) {

  const [isSaved, setIsSaved] = React.useState(false);

  const keywordClass = props.isSaved ? 'newsCard__keyword_active' : '';
  const iconClass = props.isSearchResults ? 'newsCard__bookmark-icon' : 'newsCard__trash-icon';
  const iconWrapperClass = props.isSearchResults ? '' : 'newsCard__righthand-container_delete';
  const bookmarkActiceClass = isSaved ? 'newsCard__bookmark-icon_active' : '';
  const infotipActiveClass = iconClass === 'newsCard__trash-icon' ? 'newsCard__infotip_active' : props.isLoggedIn ? '' : 'newsCard__infotip_active';
  const infotipText = props.isLoggedIn ? 'Eliminar de favoritos' : 'Inicia sesión para guardar artículos';


  const handleIconClick = () => {
    if (iconClass === 'newsCard__bookmark-icon') {
      if (props.isLoggedIn) {
        if (!isSaved) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      }
    }
  }

  return (
    <div className='newsCard'>
      <div className='newsCard__image-container' style={{ background: `url(${props.card.urlToImage}) no-repeat center/cover` }}>
        <div className={`newsCard__keyword ${keywordClass}`}>Nature</div>
        <div className={`newsCard__righthand-container ${iconWrapperClass}`}>
          <div className={`newsCard__infotip ${infotipActiveClass}`}>
            <div className={'newsCard__infotip-text'}>{infotipText}</div>
          </div>
          <div className='newsCard__icon-container'>
            <div className={`${iconClass} ${bookmarkActiceClass}`} onClick={handleIconClick}></div>
          </div>
        </div>
      </div>
      <div className='newsCard__text-container'>
        <p className='newsCard__date'>{props.card.publishedAt}</p>
        <h3 className='newsCard__title'>{props.card.title}</h3>
        <p className='newsCard__text'>{props.card.description}</p>
        <p className='newsCard__source'>{props.card.source.name}</p>
      </div>
    </div>
  )
}