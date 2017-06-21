import React, { Component } from 'react';
import { Grid, Row, Col, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Form } from 'react-bootstrap';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// import Fetch from 'react-fetch';

import eventsBackend from './eventsBackend';
// import events from './events';

import moment from 'moment';
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends Component {
  constructor (props) {
    super(props)
    // var newEvents = eventsBackend.getEvents();
    /*
    this.state = {
      events: events
    }
    */
    this.state = {events: []};

    this.moveEvent = this.moveEvent.bind(this)
  }

  componentDidMount() {
    fetch('api/events', {
      accept: 'application/json',
      method: 'get'
    })
    .then(response => {
      response.json().then(data => {
        console.log(typeof(data.events[0].start));
        // FIXME: Need to convert incoming start and end attributes to Date
        // objects
        data.events.forEach((thisEvent, ind, eventsArr) => {
          eventsArr[ind].start = new Date(thisEvent.start);
          eventsArr[ind].end = new Date(thisEvent.end);
        });
        this.setState(data);
      })
    });
  }



  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })

    //alert(`${event.title} was dropped onto ${event.start}`);
  }

  render(){
    function FieldGroup({ id, label, help, ...props }) {
      return (
        <FormGroup controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      );
    }

    let popoverRight = (
    <Popover id="popover-positioned-right" title="New Event">
      <Form>
        <FieldGroup id="newEventName" type="text" label="Event" placeholder="Enter event" />
        <FieldGroup id="newEventTime" type="text" label="Time" placeholder="Enter time" />
        <Button type="submit">Add New Event</Button>
      </Form>
    </Popover>
    );
    return (
      <Grid>
        <Row>
          <Col>
            <div className="rbc-toolbar">
            <OverlayTrigger trigger="click" placement="right" overlay={popoverRight}>
              <Button bsSize="lg">new event</Button>
            </OverlayTrigger>
            </div>
            <DragAndDropCalendar
            selectable
            events={this.state.events}
            onEventDrop={this.moveEvent}
            views={['week', 'day', 'agenda']}
            defaultView='week'
            defaultDate={new Date(2015, 3, 12)}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
