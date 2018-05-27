import React from 'react';
// Haven't used React Router yet
// Link is a HOC
import { Link } from 'react-router-dom';
// React Router doesn't support query string parsing anymore because of different parsing implementation expectations
// So, we'll use this external library to parse the query string
import queryString from 'query-string';
// library for AJAX requests, library not really needed - could use traditional method?
import axios from 'axios';

class QuotesDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      quote: {}
    };
  }

  // HELPERS

  fetchQuote(id) {
    axios.get(`api/quotes/${id}`).then(response => {
      this.setState({ quote: response.data });
    }).catch(error => {
      console.error(error);
    });
  }
  
  setQuoteIdFromQueryString(qs) {
    this.qsParams = queryString.parse(qs);
    if (this.qsParams.quote) {
      this.quoteId = Number(this.qsParams.quote);
    } else {
      // if not set, lets use the beginning page
      this.quoteId = 1;
      // update URL to be /?quotes=1
      this.props.history.push(`/?quote=${this.quoteId}`);
    }
  }

  // LIFECYCLE

  // called just before, only on first render
  componentDidMount(){
    // location is passed by default by a HOC (Route in App)
    // search basically holds the query string
    console.log("In componentDidMount!");
    this.setQuoteIdFromQueryString(this.props.location.search);
    this.fetchQuote(this.quoteId);
  }

  // called just before rendering, every time component will receive props
  // nextProps arguments is automatically passed
  componentWillReceiveProps(nextProps){
    console.log("In componentWillReceiveProps!");
    this.setQuoteIdFromQueryString(nextProps.location.search);
    this.fetchQuote(this.quoteId);
  }

  //RENDER

  render(){
    console.log(this.state);
    const nextQuoteId = Number(this.state.quote.id) + 1;
    const prevQuoteId = Number(this.state.quote.id) - 1;
    console.log("current: ", this.state.quote.id);
    console.log("next: ", nextQuoteId);
    console.log("next: ", prevQuoteId);

    return (
      <div>
        <Link to={`/?quote=${prevQuoteId}`}> Previous </Link>
        <br></br>
        <Link to={`/?quote=${nextQuoteId}`}> Next </Link>
        <p> {this.state.quote.text} </p>
        <p> {this.state.quote.author} </p>
      </div>
    )
  }
}

export default QuotesDisplay;