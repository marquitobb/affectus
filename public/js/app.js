document.addEventListener("DOMContentLoaded", () => {
  const listadoEstrategias = document.querySelector(".listado-estrategias");
  const editarEst = document.querySelector(".editar-estrategia");
  if (listadoEstrategias) {
    listadoEstrategias.addEventListener("click", ObtenerEstrategia);
  }

  if (editarEst) {
    editarEst.addEventListener("click", EditarEstrategia);
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

