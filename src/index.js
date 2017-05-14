import React from 'react';
import ReactDOM from 'react-dom';
import PageTitle from './PageTitle';
import DragDropContext from './Calendar';

ReactDOM.render(
  <PageTitle />,
  document.getElementById('top-jumbotron')
);

ReactDOM.render(
  <DragDropContext />,
  document.getElementById('root')
);
