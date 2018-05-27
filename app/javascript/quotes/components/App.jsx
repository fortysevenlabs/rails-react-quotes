import React from 'react';
// Haven't dived into React Router yet
// not installed by webpacker by default
// install this 'yarn add react-router-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import QuotesDisplay from './QuotesDisplay'

// Haven't encountered this setup so far
// Stateless Functional Component
const App = (props) => (
  // Why are comments ok here in this render function? 
  // Revisit how this feels in traditional function
  // Setup Router
  // Router will render components depending on the path user types into browser
  // In this setup, we have only one component. How would more components look?
  // Router, Route are Higher-Order Components ()
  // Components Rendered by Route will get three objects as props: location, match, history
  // HOC will get three objects as props: location, match, history
  <Router>
    <div>
      <Route 
        path='/'
        component={QuotesDisplay}
      />
    </div>
  </Router>
)

export default App;