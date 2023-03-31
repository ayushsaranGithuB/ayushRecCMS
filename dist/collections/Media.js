"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var Media = {
    slug: 'media',
    upload: {
        staticDir: path_1.default.resolve(__dirname, '../../media'),
        // Specify the size name that you'd like to use as admin thumbnail
        adminThumbnail: 'thumbnail',
        imageSizes: [
            {
                height: 400,
                width: 400,
                crop: 'center',
                name: 'thumbnail',
            },
            {
                width: 900,
                height: 450,
                crop: 'center',
                name: 'sixteenByNineMedium',
            },
        ],
    },
    fields: [],
};
exports.default = Media;
