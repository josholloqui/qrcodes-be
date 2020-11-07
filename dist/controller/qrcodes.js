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
exports.qrCodes = void 0;
const express_1 = require("express");
const qrcode_1 = __importDefault(require("../models/qrcode"));
exports.qrCodes = express_1.Router();
exports.qrCodes.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qrCode = yield qrcode_1.default.create({
            title: req.body.title,
            url: req.body.url,
            qr_code: `https://qrtag.net/api/qr_5.png?url=${req.body.url}`
        });
        res.status(200).json(qrCode);
    }
    catch (e) {
        next(e);
    }
}));
//# sourceMappingURL=qrcodes.js.map