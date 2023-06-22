const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", ()=>{
    let inpWord = document.getElementById("input-word").value;
    //console.log(inpWord);
    fetch(`${url}${inpWord}`).then((resp) => resp.json()).then((data)=> {
        console.log(data);
        document.getElementById("result").style.display = "block";
        result.innerHTML = `
        <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playsound()"><i class="fa fa-volume-up" aria-hidden="true"></i></button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partsOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>

            <p class="word-example">
               ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;

             sound.setAttribute("src", `https:${data[0].phonetics[0].audio[0]}`);
            console.log(sound);
    });
})

.catch(() => { 
    result.innerHTML = `<h3> Couldn't find the word. </h3>`;
})

function playsound() { 
    let inpWord = document.getElementById("input-word").value;
    if ('speechSynthesis' in window) { 
      let working = new SpeechSynthesisUtterance(inpWord); 
      window.speechSynthesis.speak(working); 
    } 
    else{ 
      document.write("Browser not supported") 
    } 
  } 