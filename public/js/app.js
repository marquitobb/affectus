document.addEventListener("DOMContentLoaded", () => {
  const listadoEstrategias = document.querySelector(".listado-estrategias");
  const editarEst = document.querySelector(".editar-estrategia");
  const eliminarImagenEstrategia = document.querySelector(".eliminar-estrategia");
  const eliminarEstrategia = document.querySelector(".eliminar-estrategia-completa");

  

  if (listadoEstrategias) {
    listadoEstrategias.addEventListener("click", ObtenerEstrategia);
  }

  if (editarEst) {
    editarEst.addEventListener("click", EditarEstrategia);
  }

  if (eliminarImagenEstrategia) {
    eliminarImagenEstrategia.addEventListener("click", EliminarArchivoEstrategia);
  }

  if (eliminarEstrategia) {
    eliminarEstrategia.addEventListener("click", eliminarEstrategiaCompleta);
  }

});


$(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });
  
  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });


const ObtenerEstrategia = (e) => {
e.preventDefault();
//console.log(e.target)
//console.log(e.target.dataset.id);
if (e.target.dataset.id) {      
      const url = `${location.origin}/editar-estrategia/${e.target.dataset.id}`;
      //console.log(url);
      //enviar peticion a axios
      axios
        .get(url, { 
          params: { url },
        })
        .then(function (respuesta) {
          const estrategia = respuesta.data
          $("#id").val(estrategia.id);
          $("#usuarioId").val(estrategia.usuarioId);

          console.log(estrategia.categoriaId)
          $('#categoriaId').val(estrategia.categoriaId);
          $("#nombre").val(estrategia.nombre);
          $("#fecha_creacion").val(estrategia.fecha_creacion);
          $("#pais").val(estrategia.pais);
          $("textarea#descripcion").val(estrategia.descripcion);    
        })
        .catch((error) => {
          console.log(error)
        });
    
  }else if (e.target.tagName === "A") {
    window.location.href = e.target.href;
  };
}

const EditarEstrategia = (e) => {
  e.preventDefault();
  const id = $("#id").val();
  const nombre = $("#nombre").val();
  const fecha_creacion = $("#fecha_creacion").val();
  const pais = $("#pais").val();
  const descripcion = $("textarea#descripcion").val();
  const categoriaId = $("#categoriaId").val();

  const url = `${location.origin}/editar-estrategia/${id}`;
  axios
  .post(url, { 
    params: { url, id, nombre, fecha_creacion, pais, descripcion, categoriaId },
  })
  .then(function (respuesta) {
    Swal.fire(
      'Excelente!',
       respuesta.data,
      'success'
    ),
    $('#modal').modal('hide');
    $(".listado-estrategias").load(" .listado-estrategias");
  })
  .catch((error) => {
    Swal.fire({
      type: "error",
      title: "Hubo un error",
      text: "No se pudo actualizar",
    });
  });

  console.log('se ejecuto')  
}



const EliminarArchivoEstrategia = (e) => {
  e.preventDefault();
  const idEstrategia = $("#idEstrategia").val();
  //console.log("id",idEstrategia)

  //console.log(e.target)
  //console.log(e.target.dataset.id);
  if (e.target.dataset.id) {      
        const url = `${location.origin}/imagen-estrategia/${idEstrategia}/${e.target.dataset.id}`;
        //console.log(url);
        //enviar peticion a axios
        
        axios
          .delete(url, { 
            params: { url },
          })
          .then(function (respuesta) {
            if (respuesta.data.msg) {
              Swal.fire({
                type: "error",
                title: "Lo sentimos",
                text: respuesta.data.msg,
              });
              return
            }
            $("#divArchivos").remove();
          })
          .catch((error) => {
            console.log(error)
          });
      
    }else if (e.target.tagName === "A") {
      window.location.href = e.target.href;
    };
  }


  //Eliminar estrategia
  const eliminarEstrategiaCompleta = (e) => {
    e.preventDefault();
    //console.log(e.target)
    console.log(e.target.dataset.id);
    if (e.target.dataset.id) {
      //eliminar por medio de axios
      Swal.fire({
        title: "Confirmar Eliminación?",
        text: "Una vez eliminado no se recupera!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar",
      }).then((result) => {
        if (result.value) {
          const url = `${location.origin}/eliminar-estrategia/${e.target.dataset.id}`;
          console.log(url);
          //enviar peticion a axios
          axios
            .delete(url, { params: { url } })
            .then(function (respuesta) {
              console.log(respuesta);
              if (respuesta.status === 200) {
                Swal.fire("Eliminado!", respuesta.data, "success");
                //TODO ELIMINAR DEL DOM
                console.log(
                  e.target.parentElement.parentElement
                );
                e.target.parentElement.parentElement.parentElement.removeChild(
                  e.target.parentElement.parentElement
                );
                $(".listado-estrategias").load(" .listado-estrategias");
              }
            })
            .catch(() => {
              Swal.fire({
                type: "error",
                title: "Hubo un error",
                text: "No se pudo eliminar",
              });
            });
        }
      });
    } else if (e.target.tagName === "A") {
      window.location.href = e.target.href;
    }
  }; 


  function chatGrupal() {
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.querySelector('.chat-messages');
    const roomName = document.getElementById('room-name');
    const userList = document.getElementById('users');


    //Get username and room from URL
    const {username, room} = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    })

    const socket = io();
    const log = console.log();

    //Join chattroom
    socket.emit('joinRoom', {username, room});

    var h2 = document.getElementById('room-name');
    //var resultado = h2.textContent;
    //console.log(resultado);
    socket.emit('wait room', {room}); 

    
    //Get room and users
    socket.on('roomUsers', ({room, users}) => {
        outputRoomName(room);
        outputUsers(users)
    })

    //Message from server
    socket.on('message', message => {
        console.log(message);
        outputMessage(message);

        //Scroll Down
        chatMessages.scrollTop = chatMessages.scrollHeight;

    })


    socket.on('load old msgs', msgs => {
      for(let i = msgs.length -1; i >=0 ; i--) {
        displayMsg(msgs[i]);
      }
    })

    //Message submit obtener mensaje
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        //Get message text
        const msg = e.target.elements.msg.value
        console.log(msg);

        //Emit messahe to server
        socket.emit('chatMessage', msg);

        //Clear input
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
    })

    //Output message to DOM
    function outputMessage(message){
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `
            <p class="meta">${message.username} <span>${message.time}</span></p>
            <p class="text">
                ${message.text}
            </p>
        `;
        document.querySelector('.chat-messages').appendChild(div);
    }

    //Add room name to DOM
    function outputRoomName(room){
        roomName.innerHTML = room;
    }

    //Ad users
    function outputUsers(users){
        userList.innerHTML = `
            ${users.map(user => `
            <li>
                ${user.username}
            </li>`).join('')}
        `;
    }

    function displayMsg(data){
      const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `
            <p class="meta">${data.email} - <span>${data.fecha}</span></p>
            <p class="text">
                ${data.msg}
            </p>
        `;
        document.querySelector('.chat-messages').appendChild(div);
    }

  }

