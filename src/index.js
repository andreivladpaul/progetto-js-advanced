import './main.scss';
import _ from 'lodash'


const input = document.getElementById("search");
const results = document.getElementById("results");
const summary = document.getElementById("summary");

async function ApiCall() {
    try {
        const search = document.getElementById("search").value.toLowerCase().split(" ").join("-");
        let response = await axios.get(`https://api.teleport.org/api/urban_areas/slug:${search}/scores/`);
        return response
    } catch (error) {
        if (error) {
            alert("something went wrong, try again")
        }

    }
}
//fetch data
function fetch() {
    clear();
    ApiCall().then(response => {
        description(response.data);
        showInfo(response.data.categories);
    })
};


//check key event
input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        fetch();
    }
});

//create element with results
const showInfo = (data) => {
    if (data.length === 0) {
        alert('Qualcosa non ha funzionato prova nuovamente');
    } else {

        for (let i = 0; i < data.length; i++) {
            results.innerHTML += `
            <div class="result__item col-sm-3 col-xs-4 m-2 d-flex justify-content-center align-items-center flex-column">
            <h4 class="title">${data[i].name}</h4>
            <p>${data[i].score_out_of_10.toFixed(2)}</p> 
            </div>
            `;
        };
    }
};
// city description
const description = (data) => {
    if (data.length === 0) {
        alert('Qualcosa non ha funzionato prova nuovamente');
    } else {
        summary.innerHTML += `
            <div class="col m-2">
                <h4>Summary</h4>
                <p>${data.summary}</p>
                <p><b>City score:</b> ${data.teleport_city_score.toFixed(2)}</p> 
            </div>
        `;
    }
};
//clear sections
const clear = () => {
    results.innerHTML = "";
    summary.innerHTML = "";
}