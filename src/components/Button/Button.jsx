import React from 'react'

export const Button = ({handleLoadMore, loading}) => {
  return (
    <button type='button' className='Button' onClick={handleLoadMore} >{loading ? 'Loading' : 'Load more'}</button>
  )
}