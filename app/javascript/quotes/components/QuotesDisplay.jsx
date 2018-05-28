import React from 'react';
// Haven't used React Router yet
import { Redirect } from 'react-router-dom';
// React Router doesn't support query string parsing anymore because of different parsing implementation expectations
// So, we'll use this external library to parse the query string
import queryString from 'query-string';
// library for AJAX requests, library not really needed - could use traditional method?
import axios from 'axios';

import QuoteText from './QuoteText';
import QuoteNavigation from './QuoteNavigation';
import QuoteFooter from './QuoteFooter';

class QuotesDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      quote: {},
      fireRedirect: false
    };
  }

  // HELPERS

  fetchQuote(id) {
    axios.get(`api/quotes/${id}`).then(response => {
      this.setState({ quote: response.data });
    }).catch(error => {
      console.error(error);
      this.setState({ fireRedirect: true });
    });
  }
  
  setQuoteIdFromQueryString(qs) {
    this.qsParams = queryString.parse(qs);
    if (this.qsParams.quote) {
      this.quoteId = Number(this.qsParams.quote);
    } else {
      // if not set, lets use the beginning page
      this.quoteId = this.props.startingQuoteId;
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
    const quote = this.state.quote;
    const nextQuoteId = quote.next_id;
    const previousQuoteId = quote.prev_id;

    return (
      <div>
        <div className='quote-container'>
            {this.state.fireRedirect && <Redirect to={'/'} /> }
            {previousQuoteId && <QuoteNavigation direction='previous' otherQuoteId={previousQuoteId} /> }
            <QuoteText quote={this.state.quote} />
            { nextQuoteId && <QuoteNavigation direction='next' otherQuoteId={nextQuoteId} /> }
        </div>
          { this.state.quote.id !== parseInt(this.props.startingQuoteId, 10) &&
          <QuoteFooter startingQuoteId={this.props.startingQuoteId} /> }
      </div>
    )
  }
}

export default QuotesDisplay;