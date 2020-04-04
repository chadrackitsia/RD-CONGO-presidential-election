const form = document.getElementById("vote-form");

// Evenement lié à l'envoi du formulaire
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
    .then(data => console.log(data)) // 
    .catch(err => console.log(err))

  e.preventDefault();
});


let dataPoints = [
  { label: 'Fayulu', y: 0 },
  { label: 'Tshisekedi', y: 0 },
  { label: 'Shadary', y: 0 },
  { label: 'Kamerhe', y: 0 }
];

const chartContainer = document.querySelector('#chartContainer');

if (chartContainer) {
  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled : true,
    theme : 'theme1',
    title : {
      text: 'Resultats des Candidats'
    },
    data : [
      {
        type : 'column',
        dataPoints : dataPoints
      }
    ]
  });

  chart.render();

  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  var pusher = new Pusher('0e5dedc09bfbf94b0788', {
    cluster: 'eu',
    forceTLS: true
  });

  var channel = pusher.subscribe('candidat-poll');
  channel.bind('candidat-vote', function(data) {
    
  });
}