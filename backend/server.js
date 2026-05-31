import app from "./src/app.js"
import connectDB from "./src/config/database.js";
import config from "./src/config/config.js";

connectDB();

const PORT = config.PortNo || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})