"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const resumes_1 = __importDefault(require("./routes/resumes"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
// Initialize environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '5000', 10);
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Create uploads directory if it doesn't exist
if (!fs_1.default.existsSync(path_1.default.join(__dirname, '../uploads'))) {
    fs_1.default.mkdirSync(path_1.default.join(__dirname, '../uploads'));
}
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resume-screener')
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
// Routes
app.use('/api/jobs', jobs_1.default);
app.use('/api/resumes', resumes_1.default);
app.use('/api/dashboard', dashboard_1.default);
// Test route
app.get("/", (_req, res) => {
    res.send("👋 AI Resume Screener backend is live!");
});
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
