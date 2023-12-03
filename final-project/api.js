//Documentation
//https://www.youtube.com/watch?v=bB7xkRsEq-g


//Create prompt for chatGPT 
let promptWording = "Give me 10 book recommendations that have these features:"

//Initialize array of preferences
let preferencesArray;

//Retrieve preferences from local storage 
if (localStorage.getItem('readerPreferences') != null) {
    const preferencesString = localStorage.getItem('readerPreferences');
    preferencesArray = JSON.parse(preferencesString);
    console.log(preferencesArray)
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
