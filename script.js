let open_ai_response;

let conversation = [
  { role: "user", content: "hi" },
  { role: "assistant", content: "Hi, how can i help you today" },
];
console.log(conversation[1]);
async function conversationUserAdd(question, sentiment) {
  conversation.push({
    role: "user",
    content:
      "My happienss out of 10: " + sentiment + "." + "my input is: " + question,
  });
}
async function conversationAssiantAdd(response) {
  conversation.push({
    role: "assistant",
    content: response,
  });
}

async function openai_test() {
  var url = "https://api.openai.com/v1/chat/completions";
  let part1 = "sk";
  let part2 = "-A4pJboCGCsukQ34LZOpi";
  let part3 = "T3BlbkFJDNu6lmdk1FMM5VigWyXe";
  let apikey = part1 + part2 + part3;

  var data = {
    model: "gpt-3.5-turbo",
    messages: conversation,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify(data),
    });

    let responseData;

    if (response.ok) {
      responseData = await response.json();
      const message = responseData.choices[0].message.content;
      conversationAssiantAdd(message);

      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
      console.log(message)
      return message;
    }
    else {
      console.log( "request failed with status :", response.status);
    }

  } catch (error) {
    console.log("an error occured:", error);
  }
}
