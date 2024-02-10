// const { S3 } = require("@aws-sdk/client-s3");
// const express = require("express");
// const fileUpload = require("express-fileupload");
// const { Error } = require("mongoose");
// const app = express();
// app.use(fileUpload());
// app.use(express.json());

// const uploadImageToS3 = async (fileData, fileName) => {
//   const s3 = new S3({
//     region: "",
//     accessKeyId: "",
//     secretAccessKey: "",
//   });

//   const params = {
//     Bucket: "",
//     Key: fileName,
//     Body: fileData,
//   };

//   //   try {
//   //     const response = await s3.upload(params).promise();
//   //     return response.Location;
//   //   } catch (error) {
//   //     console.error("error uploading image to s3", error);
//   //     throw error;
//   //   }

//   try {
//     if (!req.files || !req.files.image) {
//       return res.status(400).json({ message: "no file uploaded" });
//     }
//     const imageFile = req.files.image;
//     if (!req.imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
//       return res.status(400).json({
//         message: "only image files with jpg png gif jpeg are allowed",
//       });
//     }
//     const imageBuffer = imageFile.data;
//     const imageUrl = await uploadImageToS3(imageBuffer, imageFile.name);
//     console.log("image uploaded successfully", imageUrl);
//     res.json({ imageFile: "image URL" });
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ message: "internal server error occured" });
//   }
// };

// module.exports = { uploadImageToS3 };
