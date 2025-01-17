// pages/api/deleteImage.js

import cloudinary from "@/lib/cloudinary";


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ message: 'Public ID is required' });
  }

  console.log('Attempting to delete image with publicId:', publicId); // Debug log

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    console.log('Cloudinary delete result:', result); // Debug log

    if (result.result === 'ok') {
      return res.status(200).json({ message: 'Image deleted successfully' });
    }

    return res.status(500).json({ message: 'Error deleting image from Cloudinary', result });
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
}
