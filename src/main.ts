import './style.css'


const form = document.querySelector("form") as HTMLFormElement
const input = document.querySelector("input") as HTMLInputElement
const ul = document.querySelector("ul") as HTMLUListElement
const URL = "https://api.christophmuck.de/wetter?ort="

interface Outlook{
  date: string,
  temp: string,
  wind: string
}


function renderDataList(data: string[]){
  data.forEach( el => {
    const li = document.createElement("li")
    li.textContent= el
    ul.appendChild(li)
  })
}

async function handleSubmit(e: Event){
  e.preventDefault()
  console.log(input.value)

  try {
    const res = await fetch(URL+input.value)
    const result = await res.json()
    const data: string[] = result.outlook.map((el: Outlook) => `Datum: ${el.date} Temperatur: ${el.temp}` )
    renderDataList(data)

    input.value=""
  } catch(error){
    console.log("Serverfehler")
  }


}


form.addEventListener("submit", handleSubmit)