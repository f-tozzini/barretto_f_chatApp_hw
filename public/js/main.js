(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      chatMessage = document.querySelector('.message'),
      nameInput = document.querySelector('.nickname'),
      nickName = null;

    function setNickname() {
      //debugger;
    nickName = this.value;
    nickName.style.color = 'blue';
    }

    function handleSendMessage(e) {
      e.preventDefault(); //prevent defautl behaviour - send messages
      nickName = (nickName && nickName.length > 0) ? nickName : 'user';
      msg = `${nickName} says :  ${chatMessage.value}`;

      socket.emit('chat message', msg);
      chatMessage.value = '';
      return false;
      //debugger;
    }

    function appendMessage(msg) {
      // debugger;
      let newMsg = `<li>${msg.message}</li>`;
      messageList.innerHTML += newMsg;
    }

    function appendDiscMessage(msg) {
      //debugger;
      let newMsg = `<li>${msg}</li>`;
      messageList.innerHTML += newMsg;
    }

    nameInput.addEventListener('change', setNickname, false);
    chatForm.addEventListener('submit', handleSendMessage, false);
    socket.addEventListener('chat message', appendMessage, false);
    socket.addEventListener('disconnect message', appendDiscMessage, false);

})();
