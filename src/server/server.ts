import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Define routes or API endpoints here
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).send('Server is up and running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
