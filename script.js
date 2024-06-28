/******w**************
    
    Assignment 4 Javascript
    Name: Wadia Jara
    Date: 26/06/2024
    Description:

*********************/


document.addEventListener("DOMContentLoaded", load);


function load() {
    let apiUrl = 'https://data.winnipeg.ca/resource/tx3d-pfxq.json';
    let parksData = [];

    fetch(apiUrl)
        .then(result => {
            return result.json()
        })
        .then(data => {
            parksData = data;
            displayParks(parksData);
        })
        .catch(error => console.error('Error fetching data:', error));
        

    document.getElementById("btnSearch").addEventListener("click", searchParks);
}

function displayParks(parks) {
    let parksList = document.getElementById('parks-list');
    parksList.innerHTML = '';
    parks.forEach(park => {

        const parkDiv = document.createElement('div');
        parkDiv.classList.add('park');

        const parkName = document.createElement('h2');
        parkName.textContent = park.park_name;
        parkDiv.appendChild(parkName);

        const location = document.createElement('p');
        location.textContent = `Location: ${park.location_description}`;
        parkDiv.appendChild(location);

        const category = document.createElement('p');
        category.textContent = `Category: ${park.classification_type}`;
        parkDiv.appendChild(category);

        const district = document.createElement('p');
        district.textContent = `District: ${park.district}`;
        parkDiv.appendChild(district);

        const nbhd = document.createElement('p');
        nbhd.textContent = `Neighborhood: ${park.neighbourhood}`;
        parkDiv.appendChild(nbhd); 

        const cca = document.createElement('p');
        cca.textContent = `CCA: ${park.cca}`;
        parkDiv.appendChild(cca);

        parksList.appendChild(parkDiv);
    });
}

function searchParks() {
    let searchNameInput = document.getElementById("search-name");
    let searchLocationInput = document.getElementById("search-location");

    let searchName = searchNameInput.value.toLowerCase();
    let searchlocation = searchLocationInput.value.toLowerCase();

    if(searchName == "" && searchlocation == ""){
        alert("Insert a Name or Location to start searching information.");
    }
    else {

        let baseUrl = "https://data.winnipeg.ca/resource/tx3d-pfxq.json?$query="; 

        // let query = '';
        // if (searchName) {
        //     query += `where=lower(park_name) like '%25${encodeURIComponent(searchName)}%25'`;
        // }
        // if (searchlocation) {
        //     if (query) {
        //         query += ' and ';
        //     } else {
        //         query += 'where=';
        //     }
        //     query += `lower(location) like '%25${encodeURIComponent(searchlocation)}%25'`;
        // }
    
        //let apiUrl = `${baseUrl}?${query}`;
        
        fetch(baseUrl)
            .then(result => {
                return result.json()
            })
            .then(data => {
                parksData = data;

                const filteredParks = parksData.filter(park => {
                    const parkName = park.park_name ? park.park_name.toLowerCase() : '';
                    const location = park.location_description ? park.location_description.toLowerCase() : '';
                    return parkName.includes(searchName) && location.includes(searchlocation);
                });
                console.log(filteredParks);
                displayParks(filteredParks);
            })
            .catch(error => console.error('Error fetching data:', error));
    
    }

}
