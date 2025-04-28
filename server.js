import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// For any other requests, serve the index.html from the 'dist' folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
