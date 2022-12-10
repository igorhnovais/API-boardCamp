import express from "express";
import cors from "cors";

import categoriesRouters from "./routes/categories.route.js";
import gamesRouters from "./routes/games.route.js";
import customersRouters from "./routes/customers.route.js";
import rentalsRouters from "./routes/rentals.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouters);
app.use(gamesRouters);
app.use(customersRouters);
app.use(rentalsRouters);





const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Running in port ${port}`)
});