export const barChartOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: true
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ]
  },
  legend: {
    display: true
  },
  responsive: true,
  maintainAspectRatio: false
}
