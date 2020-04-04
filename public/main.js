// DOM - Selection du formulaire de votre
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

fetch('http://localhost:127/poll')
  .then(res => res.json())
  .then(data => {
    const votes = data.votes;
    var totalVotes = votes.lenght;
    // Comptage des votes - utilisation de REDUCE (acc/current)
    const voteCounts = votes.reduce((acc, vote) => (acc[vote.candidat] = ((acc[vote.candidat] || 0) + parseInt(vote.points)), acc), {});


    let dataPoints = [
      { label: 'Fayulu', y: voteCounts.Fayulu },
      { label: 'Tshisekedi', y: voteCounts.Tshisekedi },
      { label: 'Shadary', y: voteCounts.Shadary },
      { label: 'Kamerhe', y: voteCounts.Kamerhe }
    ];
    
    const chartContainer = document.querySelector('#chartContainer');
    
    if (chartContainer) {
      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled : true,
        theme : 'theme1',
        title : {
          text: 'Total votes ' + totalVotes
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
        dataPoints = dataPoints.map(x => {
          if(x.label == data.candidat){
            x.y += data.points;
            return x;
          } else {
            return x;
          }
        });
        chart.render();
      });
    }

  });