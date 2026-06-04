const inputVal = document.querySelector("#fromInput");
const selectFrom = document.querySelector("#selectFrom");
const selectTo = document.querySelector("#selectTo");
const btn = document.querySelector("#convert");
const inputNum = document.querySelector("#fromInput");
const outputNum = document.querySelector("#toOutput");
const flagImage = document.querySelector(".FlagImg");
let toConvert = 1;

const flagBaseUrl = "https://flagsapi.com";
for (let i in countryList) {
    let img = `<img src="${flagBaseUrl}/${countryList[i]}/flat/64.png" alt="countryList[i]"> `;
    let displayOption = `${img} ${countryList[i]}`
    let optionfrom = new Option(displayOption, i);
    let optionto = new Option(countryList[i], i);
    selectFrom.add(optionfrom);
    selectTo.add(optionto);
}

inputNum.addEventListener('input', () => {
    toConvert = inputNum.value;
});


let fromCode;
let toCode;

selectFrom.addEventListener("change", (evt) => {
    fromCode = evt.target.value;
})

selectTo.addEventListener("change", (evt1) => {
    toCode = evt1.target.value;
})

async function rate(){
    console.log("Getting data");
    let URL = `https://api.frankfurter.dev/v2/rate/${fromCode}/${toCode}`;
    let response = await fetch(URL);
    let data = await response.json();
    let result = data.rate;
    outputNum.value = toConvert * result ;
    console.log(result);
    console.log(URL);
    }

// {
//   "date": "2026-06-01",
//   "base": "USD",
//   "quote": "INR",
//   "rate": 83.45
// }

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    toConvert = Number(toConvert);
    console.log(fromCode);
    console.log(typeof fromCode);
    console.log(toCode);
    console.log(typeof toCode);
    console.log(toConvert);
    console.log(typeof toConvert);

    rate();
    
});

