import express from "express";
import cors from "cors";
import process from "process";
// import sequelizeInit from "./scripts/sequelize.db.init.js";

const MLS = 10000;

const app = express();
app.use(express.json());

const corsOptions = {
  credentials: true,
  optionSuccessStatus: 200,
  headers: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  allowedHeaders: "*",
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "up and running",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const PORT = process.env.PORT ?? 5000;

async function main() {
  try {
    // await sequelizeInit();
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.log(`retrying in ${MLS}`);
    setTimeout(() => {
      main();
    }, MLS);
  }
}
main();
