"use strict";


const populateCollector = (details) => {

    document.getElementById("collector-name").innerHTML = details['data']['0']['name'];
    document.getElementById("collector-email").innerHTML = details['data']['0']['email'];
    document.getElementById("collector-cars").innerHTML = details['data']['0']['cars'];
    document.getElementById("collector-slogan").innerHTML = details['data']['0']['slogan'];
    document.getElementById("collector-trading").innerHTML = details['data']['0']['trading'];

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