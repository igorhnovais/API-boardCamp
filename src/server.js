import express from "express";
import cors from "cors";

import categoriesRouters from "./routes/categories.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouters);





const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Running in port ${port}`)
})