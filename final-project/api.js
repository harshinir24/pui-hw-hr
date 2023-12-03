//Documentation
//https://www.youtube.com/watch?v=bB7xkRsEq-g
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

//Import open AI api
// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: "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",
// });

const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: "Say this is a test" }],
//     model: "gpt-3.5-turbo",
// });

exports.chatReq = async (req, res) => {
    try {
      const message = "Which is the capital of Albania?";
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0,
        max_tokens: 1000,
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

//const OpenAI = require('openai');
//const { Configuration, OpenAIApi } = OpenAI

// const configuration = new Configuration({
//     apiKey: "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"
// })

// const openai = new OpenAIApi(Configuration);

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }

// main();


//Initialize array of preferences
let preferencesArray;

//Retrieve preferences from local storage 
if (localStorage.getItem('readerPreferences') != null) {
    const preferencesString = localStorage.getItem('readerPreferences');
    preferencesArray = JSON.parse(preferencesString);
    console.log(preferencesArray);
    console.log(preferencesArray.join(', '));
} 


async function getBookRecommendation() {

    try {
        // Making a request to the OpenAI GPT-3.5 API
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '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', // Replace with your actual API key
            },
            body: JSON.stringify({
                prompt: `10 Book recommendations based on preferences: ${preferencesArray.join(', ')}`,
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        const recommendedBooks = data.choices.map(choice => choice.text);

        // Display recommendations on the webpage
        displayRecommendations(recommendedBooks);
    } catch (error) {
        console.error('Error fetching book recommendations:', error);
    }
    


}
  
//   const apiKey = 'your-api-key';
//   const endpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';  // Use the Curie model

//   async function getBookRecommendation(prompt) {
//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//           prompt: prompt,
//           max_tokens: 150,
//           temperature: 0.7,
//         }),
//       });

//       const data = await response.json();
//       const recommendedBook = data.choices[0].text;
//       displayRecommendation(recommendedBook);
//     } catch (error) {
//       console.error('Error fetching book recommendation:', error);
//     }
//   }

//   function displayRecommendation(recommendation) {
//     // Display the recommendation on your website
//     console.log('Recommended Book:', recommendation);
//   }


// //get user input

// function getUserInput() {
//     const userInput = document.getElementById('userInput').value;
//     getBookRecommendation(userInput);
// }

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Book Recommendations</title>
// </head>
// <body>

// <h1>Book Recommendations</h1>

// <form id="preferencesForm">
//     <label for="preferences">Enter your preferences (comma-separated):</label>
//     <input type="text" id="preferences" name="preferences" required>
//     <button type="button" onclick="getBookRecommendations()">Get Recommendations</button>
// </form>

// <ul id="recommendationsList"></ul>

// {/* <script> */}
//     async function getBookRecommendations() {
//         const preferencesInput = document.getElementById('preferences');
//         const recommendationsList = document.getElementById('recommendationsList');

//         // Get preferences from the input field
//         const preferences = preferencesInput.value.split(',');

//         try {
//             // Make a request to the OpenAI GPT-3.5 API
//             const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': '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', // Replace with your actual API key
//                 },
//                 body: JSON.stringify({
//                     prompt: `Book recommendations based on preferences: ${preferences.join(', ')}`,
//                     max_tokens: 150,
//                     temperature: 0.7,
//                 }),
//             });

//             const data = await response.json();
//             const recommendedBooks = data.choices.map(choice => choice.text);

//             // Display recommendations on the webpage
//             displayBookRecommendations(recommendedBooks);
//         } catch (error) {
//             console.error('Error fetching book recommendations:', error);
//         }
//     }

function displayBookRecommendations (books) {
    const newDiv = document.createElement("div");
    const recommendationsContent = createTextNode(books)
    newDiv.appendChild(recommendationsContent);
    document.body.appendChild(newDiv)
    console.log(recommendedBooks);
}

$(document).ready(function(){
    getBookRecommendation();

});

    
// </script>

// </body>
// </html>

