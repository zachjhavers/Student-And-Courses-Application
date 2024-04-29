const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { MONGO_URI, PORT } = process.env;
const schema = require("./graphql/studentCourseSchemas");
const AuthRoute = require("./Routes/AuthRoute");
const app = express();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.use(AuthRoute);

app.listen(PORT, () => {
  console.log(`Server online on port ${PORT}`);
});
