//Documentation
//https://www.youtube.com/watch?v=bB7xkRsEq-g
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//https://www.freecodecamp.org/news/javascript-split-how-to-split-a-string-into-an-array-in-js/

//Initialize array of preferences
let preferencesArray;

//Retrieve preferences from local storage 
    if (localStorage.getItem('readerPreferences') != null) {
     const preferencesString = localStorage.getItem('readerPreferences');
     preferencesArray = JSON.parse(preferencesString);
     console.log(preferencesArray);
     console.log(preferencesArray.join(', '));
 } 

 let api_key = document.querySelector("#user_api_key").value;

 //Initiate API Request
    function OpenaiFetchAPI() {
    console.log("Calling GPT3")
    var url = "https://api.openai.com/v1/chat/completions";
    var bearer = 'Bearer ' + api_key
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model" : "gpt-3.5-turbo",
            //"prompt": `Give me 5 Book titles that are in the Fantasy genre, a NY times bestseller, and are written for adults in a JSON format.`,
            "messages": [{"role": "user", "content": `Give me a list of 5 Book titles that have all of these features: ${preferencesArray.join(', ')}`}],
            // "max_tokens": 150,
            // "temperature": 0.7,
            //"prompt": "Once upon a time",
           "max_tokens": 250,
            "temperature": 0.3,
            //"top_p": 1,
            "n": 1,
            //"stream": false,
            "logprobs": null,
            //"stop": "\n"
        }),

    }).then(response => {
    
        return response.json()
       
    }).then(data=>{
        let output = (data['choices'][0].message.content)
        $("#results").toggle();
        displayBookRecommendations(output);
        
    })
        
        .catch(error => {
            console.log('Something bad happened ' + error)
        });

}

    //Add book recommendations from Chat GPT to the body of the page
    function displayBookRecommendations (books) {
        let bookArray = Array.from(books);
        let bookString = bookArray.join("");
        let bookDisplayList = Array.from(bookString.split("\n"));

        let newHead = document.createElement("h1");
        newHead.innerText = "Your Book recommendations"
        document.querySelector("#results-section").appendChild(newHead);
        
        for (let i = 0; i < bookDisplayList.length; i++) {
            let newDiv = document.createElement("div");
            let newText = document.createElement("p");
            newText.innerHTML = bookDisplayList[i];
            newDiv.appendChild(newText);
            newText.style.fontFamily = "Helvetica"
            document.querySelector("#results-list").appendChild(newDiv);
            console.log(i);

        }
        $("#retake-quiz-button").show();

        
       console.log(bookDisplayList);
}

 $(document).ready(function(){
    $("#retake-quiz-button").hide();

 });

 //After user inputs the API key, initiate call to Chat GPT 
 $("#get-books-button").on("click", OpenaiFetchAPI());




