import React from 'react';
import Header from './Header';
import History from './History';
import Results from './Results';
import _ from 'lodash';
import AnimateHeight from 'react-animate-height';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVal: '',
      giphyResults: {},
      gallery: {},
    }

    this.showGiphyResults   = this.showGiphyResults.bind(this);
    this.addToGallery       = this.addToGallery.bind(this);
  }

  showGiphyResults(searchVal, giphyResults) {
    this.setState({
     searchVal,
     giphyResults
    });
  }

  addToGallery(e) {
    e.preventDefault();

    const {searchVal, gallery} = this.state;
    let myVal = {},
      nextGallery = {};

    if (typeof gallery[searchVal] !== 'undefined') {
      myVal[searchVal] = {giphys: [e.target.src , ...gallery[searchVal].giphys], showQueryGallery: false};
      nextGallery = Object.assign({}, gallery, myVal)
    } else {
      myVal[searchVal] = {giphys: [e.target.src], showQueryGallery: false};
      nextGallery = Object.assign({}, gallery, myVal);
    }
    this.setState({
      gallery: nextGallery
    });
  };

  render() {
    const {searchVal,giphyResults, gallery} = this.state;

    return(
      <div>
        <Header searchVal={searchVal} showGiphyResults={this.showGiphyResults} />
        <AnimateHeight duration={300} height={'auto'}>
          { !_.isEmpty(giphyResults) && <Results searchVal={searchVal} giphyResults={giphyResults} addToGallery={this.addToGallery}/>}
          { !_.isEmpty(gallery) && <History gallery={gallery} searchVal={searchVal}/> }
        </AnimateHeight>
      </div>
    )
  }
}

export default Search;
