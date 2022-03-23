"use strict";


const populateCollector = (details) => {

    document.getElementById("collector-name").innerHTML = details.collector.name;
    document.getElementById("collector-email").innerHTML = details.collector.email;
    document.getElementById("collector-cars").innerHTML = details.collector.cars;
    document.getElementById("collector-slogan").innerHTML = details.collector.slogan;
    document.getElementById("collector-trading").innerHTML = details.collector.trading;

}

const fetchCollectorDetails = async (id) => {
    try {
        const response = await fetch('http://localhost:5000/api/collectors/' + id);

        const jsonData = await response.json();

        console.log(jsonData.name);

        populateCollector(jsonData);

    }

    catch (error) {
        console.error(error);
    }
}

window.onload = function() {
    const collectorId = sessionStorage.getItem("collectorId");
    console.log(collectorId);
    fetchCollectorDetails(collectorId);
}