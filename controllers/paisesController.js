//funcion para redireccionr a la vista de formulario csv
exports.openpais = (req, res, next) => {
    console.log("direccion a pais controller");
    const pais = req.params.pais;
    res.render(`paises/${pais}`, {
        nombrePagina: pais,        
    });
}