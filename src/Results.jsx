import React from 'react';

const Results = ({searchVal, giphyResults, addToGallery}) => (
    <div className="giphy-results">
      <p>{`Results for ${searchVal}`}</p>
      <ul>
      {Object.keys(giphyResults).map(key => (
        <li><img key={giphyResults[key].id} src={giphyResults[key].images.fixed_height_small.url} onClick={e => {addToGallery(e)}} /></li>
      ))}
      </ul>
    </div>
)

export default Results;
