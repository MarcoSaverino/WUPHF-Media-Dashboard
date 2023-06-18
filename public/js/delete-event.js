let wdate = new Date();

async function editFormHandler(event) {
  event.preventDefault();
  const event_name = document.querySelector('#event_name').value;
  const event_date = wdate;
  
  // What will the value of has_nuts be if the box in the form is checked? 
  // The value of has_nuts will be true if the box is checked. 
  // What do we call this kind of operator?
  // We call this a ternary operator. It begins with a condition followed by a question mark and two code blocks separated by a :.
  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // What part of our application will handle this 'put' request?
  // The Controller will handle this 'put' request.

  const response = await fetch(`/api/event/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      event_name,
      event_date,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // What happens if the response is ok?
  // If the response is ok, that means that the event was updated successfully. 
  if (response.ok) {
    document.location.replace(`/event/${id}`);
  } else {
    alert('Failed to edit event');
  }
}

document.querySelector('.edit-event-form').addEventListener('submit', editFormHandler);
