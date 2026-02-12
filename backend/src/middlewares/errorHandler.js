//Error handling
const errorHandling = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: "Algo salió mal en el servidor",
        error: err.message
 });
}

export default errorHandling;