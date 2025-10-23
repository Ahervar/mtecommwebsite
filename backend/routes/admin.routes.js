// backend/routes/admin.routes.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.join(__dirname, "../data/products.js");

let { products } = await import(productsPath);

// ✅ Middleware to verify token
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") throw new Error("Invalid role");
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
}

// ✅ LOGIN route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ✅ Get all products
router.get("/products", verifyAdmin, (req, res) => {
  res.json(products);
});

// ✅ Add product
router.post("/products", verifyAdmin, (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  updateFile();
  res.json(newProduct);
});

// ✅ Edit product
router.put("/products/:id", verifyAdmin, (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  products[index] = { ...products[index], ...req.body };
  updateFile();
  res.json(products[index]);
});

// ✅ Delete product
router.delete("/products/:id", verifyAdmin, (req, res) => {
  const id = Number(req.params.id);
  products = products.filter((p) => p.id !== id);
  updateFile();
  res.json({ success: true });
});

// helper to update file
function updateFile() {
  const fileContent = `export const products = ${JSON.stringify(products, null, 2)};`;
  fs.writeFileSync(productsPath, fileContent, "utf-8");
}

export default router;
