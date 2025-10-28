import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'


// Import all route files
import contactRoutes from './server/routes/contact.routes.js'
import authRoutes from './server/routes/auth.routes.js'
import projectRoutes from './server/routes/project.routes.js'
import qualificationRoutes from './server/routes/qualification.routes.js'
import userRoutes from './server/routes/user.routes.js'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
//useNewUrlParser: true,
//useCreateIndex: true,
//useUnifiedTopology: true
} )
.then(() => {
console.log("Connected to the database!");
})

mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

// Mount routes
app.use('/', authRoutes)
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', qualificationRoutes)
app.use('/', userRoutes)

app.get("/", (req, res) => {
res.json({ message: "Welcome to My Portfolio application." });
});

app.listen(config.port, (err) => {
if (err) {
console.log(err)
}
console.info('Server started on port %s.', config.port)
})