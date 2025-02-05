import express from "express";
import cors from "cors";
import {connect_db}  from "./database/index.js";

const app = express();
app.use(cors());
app.use(express.json());


connect_db();

const PORT = process.env.PORT || 5002;
app.listen(PORT , () => {
    console.log(`Server is running on port : ${PORT }`);
}).on('error', (err) => {  
    if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is in use, trying a different port...`);
    app.listen(0, () => console.log(`Server running on a dynamic port`));
  } else {
    console.error(`Server failed to start: ${err.message}`);
  }
});
