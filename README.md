# RAG Document Search API

This is a powerful **Retrieval-Augmented Generation (RAG)** application designed to allow users to upload PDF documents and intelligently chat with them. By leveraging vector search and Large Language Models (LLMs), the system provides accurate, context-aware answers solely based on the uploaded content.

It keeps your main application responsive by handling heavy PDF processing in the background.

## 🚀 Features

-   **📄 Smart PDF Upload**: securely uploads and stores PDF documents.
-   **⚡ Asynchronous Processing**: Uses a Redis-based queue (BullMQ) to process large files without blocking the server.
-   **🔍 Vector Search**: Converts text into embeddings and stores them in Qdrant for semantic search.
-   **💬 AI Chat Interface**: Integrates with Google Gemini to answer user questions using the document's context.
-   **📦 Scalable Storage**: Uses AWS S3 for reliable file storage.
-   **🗄️ Structured Data**: Manages document metadata with PostgreSQL and Prisma.

## 🛠️ Tech Stack & Decisions

### Frontend
-   **Next.js (React)**: Chosen for its server-side rendering capabilities, SEO benefits, and fast performance.
-   **Tailwind CSS**: Enables rapid UI development with a utility-first approach, ensuring a modern and responsive design.
-   **Lucide React**: Provides a consistent and lightweight icon set.

### Backend
-   **Node.js & Express**: Provides a non-blocking, event-driven architecture suitable for handling multiple API requests.
-   **BullMQ (Redis)**: Critical for decoupling heavy computation (PDF parsing/embedding) from the main API thread. This ensures the user experience remains snappy even when processing large files.

### Database & Storage
-   **PostgreSQL (via Prisma)**: best-in-class relational database for maintaining data integrity (relationships between users, documents, and chat logs).
-   **Qdrant**: A specialized Vector Database optimized for high-dimensional vector search, essential for the RAG retrieval step.
-   **AWS S3**: Industry-standard object storage for keeping binary files (PDFs) secure and accessible.

### AI & ML
-   **Google Gemini**:
    -   *Embeddings (`embedding-001`)*: Transforms text into mathematical vectors to "understand" and compare semantic meaning.
    -   *LLM (`gemini-2.0-flash`)*: Generates natural language responses. Selected for its excellent balance of speed, cost, and context window size.
-   **LangChain**: Orchestrates the complex workflow of loading PDFs, splitting text, and interacting with the LLM.

## 🏗️ Folder Structure

```
├── backend
│   ├── controllers     # Logic for API endpoints (chat, upload)
│   ├── lib             # Helper libraries (embedding, queue, S3)
│   ├── routes          # API route definitions
│   ├── index.js        # Main Express server entry point
│   ├── worker.js       # Background worker for processing PDFs
│   └── ...
├── frontend
│   ├── app             # Next.js app router pages
│   ├── components      # Reusable React components
│   └── ...
```

## ⚙️ Prerequisites

Before running the project, ensure you have the following installed:
-   **Node.js** (v18+)
-   **Docker** (for running Redis and Qdrant easily)
-   **PostgreSQL** (Local or Cloud)

## 🚀 Setup & Run

1.  **Start Infrastructure (Redis & Qdrant)**:
    If using Docker, run:
    ```bash
    docker run -p 6379:6379 -d redis
    docker run -p 6333:6333 -d qdrant/qdrant
    ```

2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` folder:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
    GEMINI_API_KEY="your-gemini-key"
    AWS_ACCESS_KEY="your-aws-key"
    AWS_SECRET_KEY="your-aws-secret"
    BUCKET_NAME="your-s3-bucket"
    AWS_REGION="your-region"
    REDIS_HOST="localhost"
    REDIS_PORT=6379
    ```

3.  **Run Backend Server**:
    ```bash
    npm run dev
    ```

4.  **Run Background Worker**:
    Open a new terminal in `backend` and run:
    ```bash
    node worker.js
    ```

5.  **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## 🔌 API Reference

### 1. Upload Documents
**Endpoint:** `POST /api/upload-documents`
-   **Description**: Queues a PDF for processing.
-   **Body**: Form-data with `file`.

### 2. Chat with Documents
**Endpoint:** `POST /api/chat`
-   **Description**: Ask questions about the uploaded content.
-   **Body**: `{ "question": "What is this doc about?" }`
-   **Response**: `{ "answer": "...", "sources": [...] }`

## 🔄 Search Flow (Under the Hood)

1.  **User Question** ➔ Converted to Vector (Embedding).
2.  **Vector Search** ➔ Finds top 5 matching text chunks in Qdrant.
3.  **Context Assembly** ➔ Combines Question + Matched Chunks.
4.  **LLM Generation** ➔ Gemini answers the question using the provided context.
