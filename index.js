const express = require("express");
const { presentationsRouter } = require("./Presentations/presentationsAPI");
const { slidesRouter } = require("./Slides/slidesAPI");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

app.use("/presentations", presentationsRouter);
app.use("/presentations/:presentationTitle/slides", slidesRouter);

app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
