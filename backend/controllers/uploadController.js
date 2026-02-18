import { pdfQueue } from "../lib/queue.js";
import crypto from "crypto";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            console.log("No file uploaded"); // Added log
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("File received:", req.file); // Added log
        console.log("Body received:", req.body); // Added log

        const { path, originalname, mimetype } = req.file;
        const { clientId } = req.body;

        // Calculate checksum
        const fileBuffer = fs.readFileSync(path);
        const checksum = crypto.createHash('md5').update(fileBuffer).digest('hex');

        // Check for duplicate
        const existingDocument = await prisma.document.findFirst({
            where: {
                checksum: checksum,
                clientId: clientId || "default"
            }
        });

        if (existingDocument) {
            // Delete the uploaded file since it's a duplicate
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
            console.log(`Duplicate document upload attempt. Checksum: ${checksum}`);
            return res.status(409).json({
                error: "Duplicate document",
                message: "This document has already been uploaded."
            });
        }

        // Add job to queue
        await pdfQueue.add("process-pdf", {
            filePath: path,
            originalName: originalname,
            mimeType: mimetype,
            clientId: clientId || "default",
            checksum: checksum,
        });

        res.status(202).json({
            message: "File uploaded and processing started",
            filename: originalname,
        });
    } catch (error) {
        console.error("Error uploading document:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const getDocuments = async (req, res) => {
    try {
        const documents = await prisma.document.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
