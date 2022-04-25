
//Gotta create the chart outside of the function
var myChart = null;

//Uploads the data into a chart
function updateChart(jsonData)
{
    const ctx = document.getElementById('myChart').getContext('2d');


    //Destroys old data from a chart, if any exists. This has to happen, so that new data can be uploaded
    if(myChart!=null)
    {
        myChart.destroy();
    }


    //Puts API time data into the "labels" array
    let labels = jsonData.map(function(item) {
        return item.date_time.substr(0, 4) + '/' + item.date_time.substr(5, 2) + '/' + item.date_time.substr(8, 2) + ' ' + item.date_time.substr(11, 8);
     });


     //Puts API value data into the "data" array
     let data = jsonData.map(function(item) {
        return item[document.getElementById("signal").value];
     });
    

     //In this else if monster, we translate the signal names to Finnish and choose the chart type
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

    
     //Chart creation (check the documentation on chart.js website)
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



//Populates the table
const populateTable = (data) => {

    const table = document.getElementById("tableBody");

    //Clears table of data
    table.innerHTML = "";

    //fills the table with new data
    data.map(item => {

        const row = document.createElement("tr");

        //substr is used to collect certain letters from the data here. substr syntax is variable.substr([starting letter], [how many letters you take from there])

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



//Fetches data from the API
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


//These listeners listen to the selections in html files
document.getElementById("signal").addEventListener("change", function(){
    fetchData();
})

document.getElementById("timespan").addEventListener("change", function(){
    fetchData();
})


//Runs when the website is loaded
fetchData();