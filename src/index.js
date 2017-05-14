import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import PageTitle from './PageTitle';
import DragDropContext from './Calendar';

/*
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <PageTitle />,
  document.getElementById('top-jumbotron')
);

ReactDOM.render(
  <DragDropContext />,
  document.getElementById('root')
);
