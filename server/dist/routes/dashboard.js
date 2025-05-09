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
const Resume_1 = __importDefault(require("../models/Resume"));
const Job_1 = __importDefault(require("../models/Job"));
const router = express_1.default.Router();
// Get dashboard statistics
router.get('/stats', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [totalCandidates, totalJobs, qualifiedCandidates, pendingReviews] = yield Promise.all([
            Resume_1.default.countDocuments(),
            Job_1.default.countDocuments(),
            Resume_1.default.countDocuments({ status: 'qualified' }),
            Resume_1.default.countDocuments({ status: 'pending' })
        ]);
        const stats = {
            totalCandidates,
            totalJobs,
            qualifiedCandidates,
            pendingReviews
        };
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
exports.default = router;
