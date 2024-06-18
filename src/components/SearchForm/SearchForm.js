import React from 'react';

export default function SearchForm({ onSubmit, isSearch }) {

  const [keyword, setKeyword] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  const placeHolderValue = isError ? 'Please enter a keyword' : 'Introduce un tema';
  const errorClass = isError ? 'searchForm__input-error' : '';

  React.useEffect(() => {
    setKeyword('');
  }, [isSearch]);

  const onKeywordChange = (e) => {
    setKeyword(e.target.value);
    if (keyword.length === 0) {
      setIsError(true);
    }
  }

  function onSearchSubmit(e) {
    e.preventDefault();
    onSubmit(keyword);
    setIsError(false);
  }

  return (
    <form className='searchForm' name='searchForm' onSubmit={onSearchSubmit}>
      <fieldset className='searchForm__fieldset'>
        <input
          type='text'
          className={`searchForm__input ${errorClass}`}
          id='text'
          name='text'
          placeholder={placeHolderValue}
          value={keyword || ''}
          onChange={onKeywordChange}
          required
        />
        <button type='submit' className='searchForm__button'>Buscar</button>
      </fieldset>
    </form>
  )
}