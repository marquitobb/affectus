

  function ejecutarFunciones(){
    const socket = io();
    const $messageForm = $('#chat-form-single')
    const $msgsingle = $('#msg-single')
    const $text = $('.text');
    const $usuarioRecibe = $('#name-recibe')
    const $usuarioEnvia = $('#name-envia');

    const usuarios = {
        usuarioRecibe: $usuarioRecibe.val(),
        usuarioEnvia : $usuarioEnvia.val(),
    }

    //console.log($usuarioRecibe.val());
    //console.log($usuarioEnvia.val());


    socket.emit('joinRoom', usuarios, data => {
        console.log(data);
    });

    //events
    $messageForm.submit(e => {
        e.preventDefault();
        //console.log('enviando datos')
       socket.emit('send-message', `/w ${$usuarioRecibe.val()} ${$msgsingle.val()}`, data => {
            console.log("ERRORES DE CB", data)
            
       });
       $msgsingle.val('')
    })

    const datosRoom = {
        nick: $usuarioEnvia.val(),
        recibe: $usuarioRecibe.val()
    }

    console.log(datosRoom);
    socket.emit('show mess', datosRoom); 


    socket.on('new message', function(data) {
        console.log(data);
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `
            <p class="meta">${data.envia} - <span>${data.fecha}</span></p>
            <p class="text">
                ${data.msg}
            </p>
        `;
        document.querySelector('.chat-messages1').appendChild(div);
    })

    socket.on('whisper', function(data) {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `
            <p class="meta">${data.envia} - <span>${data.fecha}</span></p>
            <p class="text">
                ${data.msg}
            </p>
        `;
        document.querySelector('.chat-messages1').appendChild(div);
    })

    socket.on('load old msgs', (msgs, msgs1) => {
        for(let i = msgs.length -1; i >=0 ; i--) {
          displayMsg(msgs[i]);
        }
        for(let i = msgs1.length -1; i >=0 ; i--) {
            displayMsg(msgs1[i]);
        }
      });
  
      function displayMsg(data) {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `
            <p class="meta">${data.nick} - <span>${data.fecha}</span></p>
            <p class="text">
                ${data.msg}
            </p>
        `;
        document.querySelector('.chat-messages1').appendChild(div);
      }

  }

    

  