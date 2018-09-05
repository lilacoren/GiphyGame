import React from 'react';
import _ from 'lodash';

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gallery: props.gallery
    }

    this.showQueryGallery   = this.showQueryGallery.bind(this);
    this.removeFromGallery  = this.removeFromGallery.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      gallery: nextProps.gallery
    })
  }

  showQueryGallery(e) {
    e.preventDefault()

    let {gallery} = this.state,
      nextGallery = Object.assign({}, gallery);

    if (_.isEmpty(nextGallery)) {
      return ;
    }
    nextGallery[e.target.innerText].showQueryGallery = !gallery[e.target.innerText].showQueryGallery;

    this.setState({
      gallery: nextGallery
    })
  };

  removeFromGallery(e) {
    e.preventDefault();

    const {gallery} = this.state;
    let nextGallery = Object.assign({}, gallery),
      currQuery = e.target.getAttribute('type');

    nextGallery[currQuery].giphys = nextGallery[currQuery].giphys.filter((giphyUrl) => (
      giphyUrl !== e.target.src
    ));

    if (!nextGallery[currQuery].giphys.length){
      delete nextGallery[currQuery];
    }

    this.setState({
      gallery: nextGallery
    })
  };

  render() {
    const {gallery} = this.state;

    return(
      <div className="queries-history">
        <p>History</p>
        <ul>
          {Object.keys(gallery).map(query => {
            return (
            <li>
              <span onClick={ e => this.showQueryGallery(e)} >{query}</span>
              { gallery[query].giphys.length &&
                <ul className={`query-gallery-list${gallery[query].showQueryGallery ? ' show' : ''} `}>
                  {gallery[query].giphys.map((giphy) => {
                     return <li><img type={query} src={giphy} onClick={ e => this.removeFromGallery(e)}/></li>
                  })}
                </ul>
              }
            </li> )
          })}
        </ul>
      </div>
    )
  }
}

export default History;
