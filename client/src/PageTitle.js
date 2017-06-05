import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';

class PageTitle extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Calendar App</h1>
              <p>This is a collaborative calendar app that allows multiple users to add events to a calendar and see the changes real-time</p>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default PageTitle;
