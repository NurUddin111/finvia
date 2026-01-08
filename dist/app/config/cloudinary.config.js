"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = exports.uploadBufferToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const stream_1 = __importDefault(require("stream"));
const env_1 = require("./env");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
cloudinary_1.v2.config({
    cloud_name: env_1.envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.envVars.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: env_1.envVars.CLOUDINARY.CLOUDINARY_API_SECRET,
});
const uploadBufferToCloudinary = async (buffer, fileName) => {
    try {
        return new Promise((resolve, reject) => {
            const public_id = `pdf/${fileName}-${Date.now()}`;
            const bufferStream = new stream_1.default.PassThrough();
            bufferStream.end(buffer);
            cloudinary_1.v2.uploader
                .upload_stream({
                resource_type: "auto",
                public_id: public_id,
                folder: "pdf",
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            })
                .end(buffer);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, `Error uploading file ${error.message}`);
    }
};
exports.uploadBufferToCloudinary = uploadBufferToCloudinary;
exports.cloudinaryUpload = cloudinary_1.v2;
