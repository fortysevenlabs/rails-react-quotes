import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const quotes = document.querySelector('#quotes');
// leverage HTMLElement's 'dataset' property
// dataset provides read/write access to custom data attributes (data-*)
ReactDOM.render( <App startingQuoteId={quotes.dataset.startingQuoteId} /> , quotes)