import app from "./app.js"

const port = process.env.PORT || 3001;

//Servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})