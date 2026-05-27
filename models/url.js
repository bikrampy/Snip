import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        clickCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

const URL = mongoose.model("Url", urlSchema);

export default URL;
