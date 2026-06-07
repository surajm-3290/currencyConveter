const inputVal = document.querySelector("#fromInput");
const selectFrom = document.querySelector("#selectFrom");
const selectTo = document.querySelector("#selectTo");
const btn = document.querySelector("#convert");
const inputNum = document.querySelector("#fromInput");
const outputNum = document.querySelector("#toOutput");
const flagImageFrom = document.querySelector("#FlagImgFrom");
const flagImageTO = document.querySelector("#FlagImgTO");
const displayBeforeBtn = document.querySelector(".outputDisplay");
const belowExRate = document.querySelector("#exRate");
const perRate = document.querySelector("#perrate");
const lastUpdated = document.querySelector("#lastUpdated");
let toConvert = 1;
const flagBaseUrl = "https://flagsapi.com";
let fromCode;
let toCode;


for (let i in countryList) {
    let optionfrom = new Option(countryList[i], i);
    let optionto = new Option(countryList[i], i);
    selectFrom.add(optionfrom);
    selectTo.add(optionto);

}

inputNum.addEventListener('input', () => {
    toConvert = inputNum.value;
});

selectFrom.addEventListener("change", (evt) => {
    fromCode = evt.target.value;
    let index = selectFrom.selectedIndex;
    let countryName = selectFrom.options[index].text;
    flagImageFrom.innerHTML = `<img src="https://flagsapi.com/${countryName}/flat/64.png" class="UrlImg">`

})

selectTo.addEventListener("change", (evt1) => {
    toCode = evt1.target.value;
    let index = selectTo.selectedIndex;
    let countryName = selectTo.options[index].text;
    flagImageTO.innerHTML = `<img src="https://flagsapi.com/${countryName}/flat/64.png" class="UrlImg">`

})

const paraStatus = document.createElement("p");
paraStatus.textContent = "Calculating.....";
paraStatus.className = "status";

const paraOutput = document.createElement("p");
paraOutput.className = "outputDisplay";

async function rate(){
    console.log("Getting data");
    let URL = `https://api.frankfurter.dev/v2/rate/${fromCode}/${toCode}`;
    let response = await fetch(URL);
    let data = await response.json();
    let result = data.rate;
    let finalValue = toConvert * result ;
    perRate.removeChild(paraStatus);
    perRate.appendChild(paraOutput);
    outputNum.value = finalValue.toFixed(2);
    
    paraOutput.textContent = `${toConvert} ${fromCode}  =  ${finalValue.toFixed(2)} ${toCode}`;
    belowExRate.innerText = `1 ${fromCode} = ${result.toFixed(3)} ${toCode}`;
    }

// {
//   "date": "2026-06-01",
//   "base": "USD",
//   "quote": "INR",
//   "rate": 83.45
// }

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    if((toCode == undefined) || (fromCode == undefined)){
        alert("Select Country Code!!");
    }else{
        toConvert = Number(toConvert);
        if(perRate.childElementCount != 0){
            perRate.replaceChildren();
        }
        perRate.appendChild(paraStatus);
        rate();
    }
});

const theme = document.querySelector("#theme");
theme.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
})


async function api() {
    let URL = `https://api.frankfurter.dev/v2/rate/USD/INR`;
    let response = await fetch(URL);
    let data = await response.json();
    lastUpdated.innerText = `Date: ${data.date}`;
    belowExRate.innerText = `1 USD = ${data.rate.toFixed(2)} INR`;
}

api();