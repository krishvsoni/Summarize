const textArea = document.getElementById('text_to_summarize');
const submitButton = document.getElementById('submit-button');
const summarizedTextArea = document.getElementById('summary');

const sampleTextButton = document.getElementById('sample-text-button');

const sendToSlackButton = document.getElementById('send-to-slack-button');
const sendToDiscordButton = document.getElementById('send-to-discord-button');


// Sample text to insert
const sampleText = "This is some sample text that you can use for demonstration purposes. Postman is an API platform for building and using APIs. What is Postmna? Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs—faster.";

// Function to insert sample text into the text area
function insertSampleText() {
  textArea.value = sampleText;
}

// Add a click event listener to the sample text button
sampleTextButton.addEventListener('click', insertSampleText);

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called ‘textarea’
  const textarea = e.target;

  // Verify the TextArea value.
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    // Enable the button when text area has value.
    submitButton.disabled = false;
  } else {
    // Disable the button when text area is empty.
    submitButton.disabled = true;
  }
}

function submitData(e) {

  // This is used to add animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Send the text to the server using fetch API

  // Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  
  fetch('/summarize', requestOptions)
    .then(response => response.text()) // Response will be summarized text
    .then(summary => {
      // Do something with the summary response from the back end API!

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log(error.message);
    });
}




// Function to send the summary to Slack
function sendToSlack() {
  const summary = summarizedTextArea.value; // Get the summary text
  // Make an HTTP POST request to your server's "/send-summary" endpoint with the summary
  // (You'll need to implement this on your server)
}

// Function to send the summary to Discord
function sendToDiscord() {
  const summary = summarizedTextArea.value; // Get the summary text
  // Make an HTTP POST request to your server's "/send-summary" endpoint with the summary
  // (You'll need to implement this on your server)
}

// Add click event listeners to the send buttons
sendToSlackButton.addEventListener('click', sendToSlack);
sendToDiscordButton.addEventListener('click', sendToDiscord);
