const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors()); // Ini akan memungkinkan semua permintaan dari domain manapun
// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost", // Ganti dengan host Anda
  user: "root", // Ganti dengan username Anda
  password: "admin123", // Ganti dengan password Anda
  database: "tomoro", // Ganti dengan nama database Anda
});

// Cek koneksi ke database
db.connect((err) => {
  if (err) {
    console.error("error connecting to database: ", err.stack);
    return;
  }
  console.log("connected to database as id " + db.threadId);
});

// Endpoint untuk registrasi pengguna
app.post("/register", (req, res) => {
  const { name, email, phone, address, password, birthday, gender } = req.body;

  // Validate input
  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !password ||
    !birthday ||
    !gender
  ) {
    return res.status(400).send("All fields are required");
  }

  // Encrypt password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send("Error encrypting password");
    }

    // Insert data into the database
    db.query(
      "INSERT INTO users (name, email, phone, address, password, birthday, gender, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [name, email, phone, address, hashedPassword, birthday, gender],
      (err, result) => {
        if (err) {
          console.error("Error inserting user:", err); // Log error di sini
          return res.status(500).send("Error adding user to database");
        }
        console.log("User registered successfully:", result); // Log hasil query
        res.status(201).send("User registered successfully");
      }
    );
  });
});

// Endpoint untuk verifikasi kode OTP
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  // Generate OTP sementara untuk validasi
  const expectedOtp = "0000"; // Dalam aplikasi nyata, ini akan di-generate saat OTP dikirim

  if (otp === expectedOtp) {
    res.status(200).send("OTP verified successfully");
  } else {
    res.status(400).send("Invalid OTP");
  }
});

// Endpoint untuk login pengguna
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  // Cek apakah email ada di database
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).send("Internal server error");
    }
    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = results[0];
    const formattedJoined = new Date(user.created_at)
      .toISOString()
      .split("T")[0];
    const formattedBirthday = new Date(user.birthday).toLocaleDateString();

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send("Error checking password");
      }
      if (!isMatch) {
        return res.status(401).send("Invalid password");
      }

      // Kirim semua data pengguna ke frontend
      res.status(200).json({
        message: "Login successful",
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        birthday: formattedBirthday,
        gender: user.gender,
        joined: formattedJoined,
      });
    });

    console.log("Data dikirim ke client:", {
      message: "Login successful",
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      birthday: formattedBirthday,
      gender: user.gender,
      joined: formattedJoined,
    });
  });
});

app.get("/menus", (req, res) => {
  console.log("Endpoint /menus was hit!");
  db.query(
    "SELECT id, nama, image, rating, harga FROM menus",
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send("Error fetching menus");
      }

      res.status(200).json(results);
    }
  );
});

app.post("/pesanans", (req, res) => {
  const { menu_id, user_id, total_harga, size, iced, quantity } = req.body;

  const query = `
    INSERT INTO pesanans (menu_id, user_id, total_harga, size, iced, quantity, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(
    query,
    [menu_id, user_id, total_harga, size, iced, quantity],
    (err, results) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).send("Error inserting order");
      }

      res.status(201).send("Order successfully added");
    }
  );
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://192.168.203.178:${port}`);
});
