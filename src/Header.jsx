import React from 'react';
import axios from 'axios';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchVal: this.props.searchVal
    }

    this.searchForGiphys    = this.searchForGiphys.bind(this);
    this.handleInputChange  = this.handleInputChange.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({
      searchVal: target.value
    });
  }

  searchForGiphys() {
    const {value} = this.state;

    if(this.state.searchVal === '') {
      return;
    }
    axios.get(`https://api.giphy.com/v1/gifs/search?q=${this.state.searchVal}&api_key=GUWlVabYrmAX0MNe9IGFEIXntWlwLzmV&limit=5`)
      .then(res => {
        this.props.showGiphyResults(this.state.searchVal ,res.data.data)
      });
  }

  render() {
    const {searchVal} = this.state;

    return(
      <header>
        <h2>The Giphy Game</h2>
        <div>
        <input type="text" value={searchVal} onChange={this.handleInputChange} placeholder="Search a Giphy"/>
        <button onClick={this.searchForGiphys}>Submit</button>
        </div>
      </header>
    )
  }
}

export default Header;
