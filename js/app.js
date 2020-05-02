console.log('app working')

const gridBox = document.getElementById("employee-main");
const url = 'https://randomuser.me/api/?results=12'

async function fetcingData(url) {
    const data = await fetch(url)
    const dataJSON = await data.json();
    return dataJSON;
}
const test = fetcingData('https://randomuser.me/api/?results=12').then(data => console.log(data))
// fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         data.results.forEach(employee => {
//             console.log(employee)  
//         })
//     })