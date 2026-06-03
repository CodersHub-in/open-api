import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const port = 3001;

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false
});

// CORS configuration
// const corsOptions = {
//     origin: [
//         'http://localhost:3001',
//     ],
//     optionsSuccessStatus: 200 
// };

// Middleware configuration
app.use(cors(
    {
        origin: "*",
        optionsSuccessStatus: 200
    }
));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));

// Import routes
import homePageRoutes from './src/routes/homePage.routes.js';
import api_v0_1_router from './src/routes/api/v0.1/index.routes.js';
import api_v1_0_router from './src/routes/api/v1.0/index.routes.js';

// Import Swagger yaml config path
import path from 'path';

// Setup static file serving for swagger.yaml so the React app can read it
app.get('/swagger.yaml', (req, res) => {
    res.sendFile(path.resolve('./docs/swagger.yaml'));
});

// Use routes
app.use('/', homePageRoutes);
app.use('/v0.1/', api_v0_1_router);
app.use('/v1.0/', api_v1_0_router);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Catch-all route for undefined routes
app.use((req, res, next) => {
    res.status(404).json(
        {
            error: 'Route not found',
            status: 404,
            data: null,
            message: {
                docs: 'https://api-docs-codershubinc.vercel.app',
                api: 'https://api-codershubinc.vercel.app'
            }

        });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected error occurred' });
});
