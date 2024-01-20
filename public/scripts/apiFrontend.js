const apiForm = document.querySelector("#apiForm");

    
function updateFormMethod(element){
    apiForm.setAttribute("method",element.value);
}

document.querySelector("#getMessagesWord").addEventListener('click',()=>{

    apiForm.replaceChildren();


    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.placeholder = "Word to find";
    textInput.name = "title";
    textInput.required = true;
    textInput.className = "textInput";
    apiForm.appendChild(textInput);
    
    const sendButton = document.createElement("input");
    sendButton.type = "submit";
    sendButton.innerHTML = "Send GET request";
    sendButton.value = "GET";
    sendButton.className = "sendButton";

    apiForm.appendChild(sendButton);
    apiForm.action = "api/messagesWord?word="+textInput.value;
    updateFormMethod(sendButton);

})

document.querySelector("#getAllMessages").addEventListener('click',()=>{
    apiForm.replaceChildren();

    const sendButton = document.createElement("input");
    sendButton.type = "submit";
    sendButton.value = "GET";
    sendButton.className = "sendButton";


    apiForm.appendChild(inputID);
    apiForm.appendChild(sendButton);
    updateFormMethod(sendButton);
    apiForm.action = "/api/messages"

})

document.querySelector("#getUserMessages").addEventListener('click',()=>{
    apiForm.replaceChildren();


    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.placeholder = "Username/email";
    textInput.name = "title";
    textInput.required = true;
    textInput.className = "textInput";
    apiForm.appendChild(textInput);
    
    const sendButton = document.createElement("input");
    sendButton.type = "submit";
    sendButton.innerHTML = "Send GET request";
    sendButton.value = "GET";
    sendButton.className = "sendButton";

    apiForm.appendChild(sendButton);
    apiForm.action = "api/messagesWord?user="+textInput.value;
    updateFormMethod(sendButton);

})

document.querySelector("#getGroupChatMessages").addEventListener('click',()=>{
    apiForm.replaceChildren();


    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.placeholder = "groupChat";
    textInput.name = "title";
    textInput.required = true;
    textInput.className = "textInput";
    apiForm.appendChild(textInput);
    
    const sendButton = document.createElement("input");
    sendButton.type = "submit";
    sendButton.innerHTML = "Send GET request";
    sendButton.value = "GET";
    sendButton.className = "sendButton";

    apiForm.appendChild(sendButton);
    apiForm.action = "api/messagesGroup?group="+textInput.value;
    updateFormMethod(sendButton);

})
