import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { getTableJson } from "./utils";

const pricesFilePath = path.join(__dirname, "../tables/prices.csv");
const carsFilePath = path.join(__dirname, "../tables/cars.csv");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/cars", async (req, res) => {
  try {
    const cars = await getTableJson(carsFilePath);
    res.status(200).send(cars);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to get cars");
  }
});

app.get("/prices", async (req, res) => {
  try {
    const prices = await getTableJson(pricesFilePath);
    res.status(200).send(prices);
    console.log(prices);
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to get prices");
  }
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    res.status(200).send("Email sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
