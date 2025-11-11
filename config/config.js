const config = {
env: process.env.NODE_ENV || 'development',
port: process.env.PORT || 3000,
jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
mongoUri: process.env.MONGODB_URI ||
'mongodb+srv://ckelly39_db_user:Kevis1234@cluster0.crhly55.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' ||
process.env.MONGO_HOST ||
'mongodb://' + (process.env.IP || 'localhost') + ':' +
(process.env.MONGO_PORT || '27017') +
'/mernproject'
}
export default config
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTBjYWQ4OGI1NDg1ZjVkOWE3MTAiLCJpYXQiOjE3NjI4NzQ3MzcsImV4cCI6MTc2Mjk2MTEzN30.Lf7AhfoiAxtbdCuPGiOTIQNm1k1AiP2L7EegxfSP3HA"