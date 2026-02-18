import { pdfQueue } from "../lib/queue.js";

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

        // Add job to queue
        await pdfQueue.add("process-pdf", {
            filePath: path,
            originalName: originalname,
            mimeType: mimetype,
            clientId: clientId || "default",
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
