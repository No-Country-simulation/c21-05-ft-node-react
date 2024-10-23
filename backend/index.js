const  express = require( "express")
const  cors = require( "cors")
const  mongoose = require( "mongoose")
const  userRoutes = require( './routes/user.routes')
const  authRoutes = require( './routes/auth.routes')
const  shopRoutes = require( './routes/shop.routes')
const  productRoutes = require( './routes/product.routes')
const  orderRoutes = require( './routes/order.routes')
const  categoryRoutes = require('./routes/category.routes')
const  newsCarouselRoutes = require('./routes/news-carousel.routes')

const PORT = process.env.PORT || 3000
const app = express()

//connect db
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.info("db connected"))
  .then((err) => {
    err
  })


app.use(express.json())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// ROUTES
app.use("/", authRoutes)
app.use("/", userRoutes)
app.use("/", shopRoutes)
app.use("/", productRoutes)
app.use("/", orderRoutes)
app.use("/", categoryRoutes)
app.use("/", newsCarouselRoutes)

app.listen(PORT, () => {
  console.info(`server listening on port ${PORT}`)
})
