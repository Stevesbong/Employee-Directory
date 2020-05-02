console.log('app working')

const gridBox = document.getElementById("employee-main");
const url = 'https://randomuser.me/api/?results=12'

async function fetcingData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch ( error ) {
        throw error;
    }
}

function disPlayEmployees(json) {
    json.results.map( employee => {
        console.log(employee)
        const section = document.createElement("section");
        section.classList.add('card')
        gridBox.appendChild(section);
        section.innerHTML = `
            <img class="avatar" src="${employee.picture.large}" alt="${employee.name.title} ${employee.name.last} ${employee.name.first}">
            <div class="text-wrapper">
                <h4 class="name">${employee.name.first} ${employee.name.last}</h4>
                <p class="email">${employee.email}</p>
                <p class="city">${employee.location.city}</p>
            </div>
        `
    })
}
fetcingData('https://randomuser.me/api/?results=12')
    .then(disPlayEmployees)