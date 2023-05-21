import express  from "express";
import authRoutes from "./routes/authRoutes.js";
import packageRoutes from "./routes/packageRoutes.js"
import { DBconnection } from "./database/connection.js";
import  cors  from "cors";


const app = express()
const port = 3000

//configure cors
app.use(cors());

//db connection to mongo

DBconnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes middleware
app.use('/auth', authRoutes);
app.use('/package', packageRoutes);




app.listen(port, () => console.log(`app listening on port ${port}!`))