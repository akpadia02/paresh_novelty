import cloudinary from "@/lib/cloudinary";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "products",
    });

    res.status(200).json({ url: uploadResponse.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Cloudinary upload failed", error });
  }
}