let url = 'ec2-51-20-129-156.eu-north-1.compute.amazonaws.com/echo'
let protocols = ""

webSocket = new WebSocket(url, protocols);

webSocket.send("Here's some text that the server is urgently awaiting!");

webSocket.onopen = (event) => {
  webSocket.send("I just opened."+event);
};

webSocket.onmessage = (event) => {
  console.log("I just received an onmessage :"+event.data);
};

webSocket.close();



