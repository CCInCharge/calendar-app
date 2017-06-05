function getEvents() {
  return fetch('api/events', {
    accept: 'application/json',
    method: 'get'
  }).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    })
  });
}

const eventsBackend = { getEvents };

export default eventsBackend;
