let years = [];
let launchesPerYear = [];

// populate the years array
fetch('https://api.spacexdata.com/v2/launches')
  .then(data => data.json())
  .then(response => {
    let currentTime = new Date();
    let startYear = response[0].launch_year * 1; // start year
    let finalYear = currentTime.getFullYear(); // final year
    let yearDifference = finalYear - startYear;

    for (var i = 0; i <= yearDifference; i++) {
      years[i] = startYear;
      startYear++;
    }
  });

// populate the launchesPerYear
fetch('https://api.spacexdata.com/v2/launches')
  .then(data => data.json())
  .then(response => {
    for (var i = 0; i < years.length; i++) {
      launchesPerYear[i] = response.filter(
        y => y.launch_year == years[i]
      ).length;
    }
  })
  .then(createChart);

function createChart() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: '# of Launches',
          data: launchesPerYear,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          hoverBackgroundColor: 'rgba(244,67,54 ,0.2)',
          hoverBorderColor: 'rgba(244,67,54 ,1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}
