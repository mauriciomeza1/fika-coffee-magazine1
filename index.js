// 1. IMPORTACIONES

const express		= require("express")
const app			= express()

const hbs			= require("hbs")

const connectDB		= require("./config/db")
const sessionManager = require("./config/session")


// 2. MIDDLEWARES
require("dotenv").config()

sessionManager(app)

connectDB()


app.use(express.static("public"))
app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

app.use(express.static("/public"));

app.use(express.urlencoded({ extended: true }))

// 3. RUTEO
// LAYOUT MIDDLEWARE
app.use((req, res, next) =>{
    console.log(req.session.currentUser)
    res.locals.currentUser = req.session.currentUser
    next() //INVOCACION QUE DICE QUE SALTES A LA SIGUIENTE RUTA --SIGUIENTE INSTANCIA APP.USE
})

app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/articles", require("./routes/article"))
app.use("/subscribed", require("./routes/newsletter"))


// 4. SERVIDOR
app.listen(process.env.PORT, () => console.log(`Servidor activo en puerto ${process.env.PORT}`))