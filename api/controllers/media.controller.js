import { uploadToImgbb } from "../services/imgbb.service.js";

export const uploadImageController = async (req, res, next) => {
  try {
    const { imageBase64, name } = req.body || {};
    if (!imageBase64) {
      return res.status(400).json({ message: "imageBase64 is required" });
    }
    const apiKey = process.env.IMGBB_API_KEY;
    const result = await uploadToImgbb({ imageBase64, name }, apiKey);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};
