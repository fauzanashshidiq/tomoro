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
  password: "_28Mei2004", // Ganti dengan password Anda
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

      res.status(201).json({
        id: results.insertId, // ID pesanan yang baru ditambahkan
        message: "Order successfully added",
      });
    }
  );
});

app.post("/pesanans/:id", (req, res) => {
  const { status_pesanan, id } = req.body;

  const query = `
    UPDATE pesanans SET status_pesanan = ? WHERE id = ?
  `;

  db.query(query, [status_pesanan, id], (err, results) => {
    if (err) {
      console.error("Database insert error:", err);
      return res.status(500).send("Error inserting order");
    }

    res.status(201).json({
      // ID pesanan yang baru ditambahkan
      message: "Status successfully changed to 'Sudah Bayar'",
    });
  });
});

app.get("/pesanans/:id", (req, res) => {
  console.log("Endpoint /pesanans/:id was hit");
  const { id } = req.params;

  const query = "SELECT * FROM pesanans WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).send("Error fetching order");
    }

    if (results.length === 0) {
      return res.status(404).send("Order not found");
    }

    res.status(200).json(results[0]); // Kirimkan pesanan pertama yang ditemukan
  });
});

// Endpoint untuk mendapatkan pesanan berdasarkan user_id dan status_pesanan
app.get("/pesanans2", async (req, res) => {
  const { user_id, status_pesanan } = req.query;

  const query = `
    SELECT p.*, m.nama, m.image, u.name AS user_name
    FROM pesanans p
    JOIN menus m ON p.menu_id = m.id
    JOIN users u ON p.user_id = u.id
    WHERE p.user_id = ? AND p.status_pesanan = ?
  `;

  db.query(query, [user_id, status_pesanan], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching data", error: err });
    }
    res.json(results);
  });
});

// Endpoint reviews
app.post("/reviews", async (req, res) => {
  const { id_pesanan, rating, komen, timestamp } = req.body;

  // Check if required fields exist
  if (!id_pesanan || !rating || !komen) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Proceed with query to check if id_pesanan exists
  const checkQuery = `SELECT id FROM pesanans WHERE id = ?`;

  db.query(checkQuery, [id_pesanan], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Order ID does not exist." });
    }

    // Insert the review if everything is valid
    const query = `
      INSERT INTO reviews (id_pesanan, rating, komen, timestamp)
      VALUES (?, ?, ?, NOW())
    `;

    db.query(query, [id_pesanan, rating, komen], (err, result) => {
      if (err) {
        console.error("Error inserting review:", err);
        return res
          .status(500)
          .json({ message: "Error inserting review", error: err });
      }

      console.log("Review inserted successfully");
      res.status(201).json({ message: "Review submitted successfully" });
    });
  });
});

// Endpoint untuk mendapatkan reviews berdasarkan menu_id
app.get("/reviews/:menuId", async (req, res) => {
  const { menuId } = req.params;

  const query = `
    SELECT 
        m.image AS menu_image,
        m.nama AS menu_name,
        u.name AS username,
        r.timestamp AS review_timestamp,
        r.rating AS review_rating,
        r.komen AS review_comment
    FROM 
        reviews r
    JOIN 
        pesanans p ON r.id_pesanan = p.id
    JOIN 
        menus m ON p.menu_id = m.id
    JOIN 
        users u ON p.user_id = u.id
    WHERE 
        m.id = ?
    ORDER BY 
        r.timestamp DESC;
  `;

  try {
    // Eksekusi query dengan parameter menuId

    db.query(query, [menuId], (err, result) => {
      if (err) {
        console.error("Error fetching reviews:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Jika tidak ada hasil
      if (result.length === 0) {
        return res.status(200).json([]); // Tidak ada review, tapi respons tetap berhasil
      }

      // Kirimkan hasil ke client
      res.json(result);
    });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/menu/:menuId", async (req, res) => {
  const { menuId } = req.params; // Ambil menuId dari parameter URL

  try {
    // Query untuk mengambil data menu berdasarkan menuId
    const query = "SELECT nama, image FROM menus WHERE id = ?";
    db.query(query, [menuId], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send("Error fetching menus");
      }

      // Jika tidak ada hasil ditemukan
      if (results.length === 0) {
        return res.status(404).json({ message: "Menu not found" });
      }

      // Mengembalikan hasil
      res.status(200).json(results[0]); // Mengirim data menu pertama
    });
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/review/:userId", async (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
        r.id,
        m.id AS menu_id,
        p.id AS order_id,
        r.rating AS review_rating,
        r.komen AS review_comment
    FROM 
        reviews r
    JOIN 
        pesanans p ON r.id_pesanan = p.id
    JOIN 
        menus m ON p.menu_id = m.id
    JOIN 
        users u ON p.user_id = u.id
    WHERE 
        u.id = ?
    ORDER BY 
        r.timestamp DESC;
  `;

  try {
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching reviews:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Jika tidak ada hasil, cukup kirimkan respons kosong
      if (result.length === 0) {
        return res.status(200).json([]); // Tidak ada review, tapi respons tetap berhasil
      }

      // Kirimkan hasil ke client
      res.json(result);
    });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE review by ID
app.delete("/reviews/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM reviews WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  });
});

// PUT (edit) review by ID
app.put("/reviews/update/:id", (req, res) => {
  const { id } = req.params; // Mengambil id dari parameter URL
  const { rating, komen } = req.body; // Mengambil data dari body request

  const query = `
    UPDATE reviews
    SET rating = ?, komen = ?, timestamp = NOW()
    WHERE id = ?
  `;

  db.query(query, [rating, komen, id], (err, result) => {
    if (err) {
      console.error("Error updating review:", err);
      return res
        .status(500)
        .json({ message: "Error updating review", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    console.log("Review updated successfully");
    res.status(200).json({ message: "Review updated successfully" });
  });
});



// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://192.168.223.191:${port}`);
});
