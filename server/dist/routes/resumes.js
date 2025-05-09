"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const Resume_1 = __importDefault(require("../models/Resume"));
const router = express_1.default.Router();
// Configure multer for file upload
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// Get all resumes
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resumes = yield Resume_1.default.find()
            .sort({ createdAt: -1 })
            .populate('jobId', 'title');
        res.json(resumes);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
// Get resumes by job ID
router.get('/job/:jobId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resumes = yield Resume_1.default.find({ jobId: req.params.jobId })
            .sort({ createdAt: -1 })
            .populate('jobId', 'title');
        res.json(resumes);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
// Get single resume
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield Resume_1.default.findById(req.params.id).populate('jobId', 'title');
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.json(resume);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
// Upload new resume
router.post('/', upload.single('resume'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = new Resume_1.default({
            candidateName: req.body.candidateName,
            email: req.body.email,
            jobId: req.body.jobId,
            resumeText: req.body.resumeText,
            score: req.body.score || 0,
            status: 'pending',
        });
        const newResume = yield resume.save();
        res.status(201).json(newResume);
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
// Update resume status
router.put('/:id/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield Resume_1.default.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        resume.status = req.body.status;
        if (req.body.feedback) {
            resume.feedback = req.body.feedback;
        }
        const updatedResume = yield resume.save();
        res.json(updatedResume);
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
exports.default = router;
