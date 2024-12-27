"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieRoutes_1 = __importDefault(require("./movieRoutes"));
const router = (0, express_1.Router)();
router.use('/movies', movieRoutes_1.default);
exports.default = router;
