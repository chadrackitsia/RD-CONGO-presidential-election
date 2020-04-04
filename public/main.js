const form = document.getElementById("vote-form");

form.addEventListener("submit", (e) => {

  const choice = document.querySelector("input[name=candidat]:checked").value;
  const data = {candidat: choice};

  fetch('http://localhost:127/poll', {
    method: 'post',
    body: JSON.stringify(data),
    headers: new Headers({
        'Content-Type' : 'application/json'
    })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

  e.preventDefault();
});