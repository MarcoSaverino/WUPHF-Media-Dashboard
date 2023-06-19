async function newFormHandler(event) {
  event.preventDefault();
  const event_name = document.querySelector('#event_name').value;

  const response = await fetch(`/api/event`, {
    method: 'POST',
    body: JSON.stringify({
      event_name,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add event');
  }
}

document
  .querySelector('.new-event-form')
  .addEventListener('submit', newFormHandler);
