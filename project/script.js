//-----------------------------------------
//Chart area

var myChart = null;

function updateChart(jsonData)
{


    const ctx = document.getElementById('myChart').getContext('2d');

    if(myChart!=null)
    {
        myChart.destroy();
    }

    let labels = jsonData.map(function(item) {
        return item.date_time.substr(0, 4) + '/' + item.date_time.substr(5, 2) + '/' + item.date_time.substr(8, 2) + ' ' + item.date_time.substr(11, 8);
     });


     let data = jsonData.map(function(item) {
        return item[document.getElementById("signal").value];
     });
    

     let label;
     let chartType;

     if(document.getElementById("signal").value == "temperature")
     {
         label = 'Lämpötila';
         chartType = 'bar'
     }
     else if(document.getElementById("signal").value == "wind_speed")
     {
         label = 'Tuulennopeus';
         chartType = 'bar'
     }
     else if(document.getElementById("signal").value == "humidity_in")
     {
        label = 'Ilmankosteus';
        chartType = 'line'
     }
     else if(document.getElementById("signal").value == "light")
     {
        label = 'Valoisuus';
        chartType = 'line'
     }
     else
     {
        label = 'error';
        chartType = 'line'
     }

    
    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                
                backgroundColor: [
                    'rgba(255, 99, 132)'
                ],

                borderColor: [
                    'rgba(255, 99, 132)'
                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },

            elements: {
                point:{
                    radius: 0
                }
            }
        }
    });
}



//-----------------------------------------
//Scripting area

const populateTable = (data) => {

    const table = document.getElementById("tableBody");

    //Clears out the old table
    table.innerHTML = "";

    data.map(item => {
        const row = document.createElement("tr");



        const dateColumn = document.createElement("td");
        dateColumn.className = "date-column";
        dateColumn.innerHTML = item.date_time.substr(0, 4) + '/' + item.date_time.substr(5, 2) + '/' + item.date_time.substr(8, 2);
        row.appendChild(dateColumn);

        const timeColumn = document.createElement("td");
        timeColumn.className = "time-column";
        timeColumn.innerHTML = item.date_time.substr(11, 8);
        row.appendChild(timeColumn);

        const dataColumn = document.createElement("td");
        dataColumn.className = "data-column";
        dataColumn.innerHTML = item[document.getElementById("signal").value];
        row.appendChild(dataColumn);

        table.appendChild(row);
    })
}


async function fetchData()
{
    try
    {
        const response = await fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/" + document.getElementById("signal").value + document.getElementById("timespan").value);

        console.log(response);

        const jsonData = await response.json();

        console.log(jsonData);

        populateTable(jsonData);

        updateChart(jsonData);
    }
    catch(error)
    {
        console.log(error);
    }
}



document.getElementById("signal").addEventListener("change", function(){
    fetchData();
})

document.getElementById("timespan").addEventListener("change", function(){
    fetchData();
})

fetchData();