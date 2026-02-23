import React from 'react';
import {
    FileText,
    Cpu,
    Database,
    MessageSquare,
    ArrowRight,
    Zap,
    Shield,
    Search,
    CloudUpload,
    ListTodo,
    Layers,
    BrainCircuit,
    ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HowItWorksPage() {
    const ingestionSteps = [
        {
            icon: <FileText className="w-8 h-8 text-blue-500" />,
            title: "1. Upload & Multer",
            description: "Files are uploaded via the frontend and handled by Multer. They are temporarily stored locally for initial validation.",
            borderColor: "border-blue-500/20",
            bgColor: "bg-blue-500/5",
        },
        {
            icon: <ListTodo className="w-8 h-8 text-purple-500" />,
            title: "2. Redis Queue",
            description: "The upload task is added to a Redis queue (BullMQ). This ensures reliable, asynchronous processing without blocking the server.",
            borderColor: "border-purple-500/20",
            bgColor: "bg-purple-500/5",
        },
        {
            icon: <CloudUpload className="w-8 h-8 text-emerald-500" />,
            title: "3. S3 & Postgres",
            description: "A background worker picks up the job, uploads the file to Amazon S3, and records the document metadata in PostgreSQL.",
            borderColor: "border-emerald-500/20",
            bgColor: "bg-emerald-500/5",
        },
        {
            icon: <BrainCircuit className="w-8 h-8 text-orange-500" />,
            title: "4. Gemini Embedding",
            description: "The PDF is split into chunks. Each chunk is sent to Google Gemini to generate high-dimensional vector embeddings.",
            borderColor: "border-orange-500/20",
            bgColor: "bg-orange-500/5",
        },
        {
            icon: <Database className="w-8 h-8 text-pink-500" />,
            title: "5. Qdrant Vector DB",
            description: "Embeddings and original text chunks are stored in Qdrant, enabling lightning-fast semantic search later.",
            borderColor: "border-pink-500/20",
            bgColor: "bg-pink-500/5",
        },
    ];

    const chatSteps = [
        {
            icon: <MessageSquare className="w-8 h-8 text-indigo-500" />,
            title: "1. User Question",
            description: "The user asks a question through the chat interface. We first convert this question into a vector using Gemini.",
            borderColor: "border-indigo-500/20",
            bgColor: "bg-indigo-500/5",
        },
        {
            icon: <Search className="w-8 h-8 text-cyan-500" />,
            title: "2. Semantic Retrieval",
            description: "We perform a similarity search in Qdrant to find the most relevant document chunks based on the question's vector.",
            borderColor: "border-cyan-500/20",
            bgColor: "bg-cyan-500/5",
        },
        {
            icon: <Layers className="w-8 h-8 text-violet-500" />,
            title: "3. Context Assembly",
            description: "The retrieved chunks are assembled into a context window, providing the AI with the specific information needed to answer.",
            borderColor: "border-violet-500/20",
            bgColor: "bg-violet-500/5",
        },
        {
            icon: <Cpu className="w-8 h-8 text-rose-500" />,
            title: "4. Gemini Generation",
            description: "The context and question are sent to Gemini-2.5-Flash to generate a natural, accurate response grounded in your data.",
            borderColor: "border-rose-500/20",
            bgColor: "bg-rose-500/5",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
                <div className="container relative z-10 px-4 mx-auto text-center max-w-5xl">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 text-sm font-medium transition-colors border rounded-full text-muted-foreground border-border hover:bg-muted bg-background/50 backdrop-blur-sm">
                        <span className="flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            RAG Architecture Deep Dive
                        </span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50 pb-2">
                        How DocSearch+ Works
                    </h1>
                    <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A look at the Retrieval-Augmented Generation (RAG) pipeline that powers your document intelligence.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/upload">
                            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold rounded-full">
                                Try it Now
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base backdrop-blur-sm bg-background/50 hover:bg-muted/80 rounded-full font-medium">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Ingestion Pipeline */}
            <section className="py-20 bg-muted/30 border-y border-border/40">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="flex flex-col items-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <CloudUpload className="w-8 h-8 text-primary" />
                            1. Document Ingestion Pipeline
                        </h2>
                        <p className="text-lg text-muted-foreground text-center max-w-2xl">
                            How we process your documents from upload to vector storage.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative isolate">
                        {ingestionSteps.map((step, index) => (
                            <div key={index} className="relative group">
                                <div className={`h-full p-6 rounded-3xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-card/60`}>
                                    <div className="mb-4 inline-flex p-3 rounded-2xl bg-background border shadow-sm group-hover:scale-110 transition-transform duration-300 ring-1 ring-border/50">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 text-foreground tracking-tight">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                                </div>
                                {index < ingestionSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20">
                                        <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vertical Spacer/Connector */}
            <div className="flex justify-center py-12">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-1 h-12 bg-gradient-to-b from-primary/20 to-primary/60 rounded-full"></div>
                    <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
                </div>
            </div>

            {/* Chat Pipeline */}
            <section className="py-20 bg-background">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="flex flex-col items-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <MessageSquare className="w-8 h-8 text-primary" />
                            2. Intelligent Chat Retrieval
                        </h2>
                        <p className="text-lg text-muted-foreground text-center max-w-2xl">
                            How we find the right answers from your documents in real-time.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {chatSteps.map((step, index) => (
                            <div key={index} className="relative group">
                                <div className={`h-full p-8 rounded-3xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-card/60`}>
                                    <div className="mb-6 inline-flex p-4 rounded-2xl bg-background border shadow-sm group-hover:scale-110 transition-transform duration-300 ring-1 ring-border/50">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Stack Section */}
            <section className="py-24 bg-muted/20 border-t border-border/40 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

                <div className="container px-4 mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Modern Tech Stack</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Built with industry-leading technologies for speed, reliability, and intelligence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                category: "Frontend",
                                techs: [
                                    { name: "Next.js 14", icon: "⚛️" },
                                    { name: "Tailwind CSS", icon: "🎨" },
                                    { name: "TypeScript", icon: "📘" },
                                    { name: "Lucide Icons", icon: "✨" }
                                ]
                            },
                            {
                                category: "Backend",
                                techs: [
                                    { name: "Node.js", icon: "🟢" },
                                    { name: "Prisma ORM", icon: "💎" },
                                    { name: "Express.js", icon: "🐂" },
                                    { name: "Redis", icon: "🔴" }
                                ]
                            },
                            {
                                category: "AI & Vector",
                                techs: [
                                    { name: "Gemini 1.5", sub: "LLM" },
                                    { name: "Qdrant DB", icon: "🎯" },


                                ]
                            },
                            {
                                category: "Infrastructure",
                                techs: [
                                    { name: "AWS S3", icon: "☁️" },
                                    { name: "PostgreSQL", icon: "🐘" },
                                    { name: "Docker", icon: "🐳" },
                                    { name: "Vercel", icon: "▲" }
                                ]
                            }
                        ].map((group, idx) => (
                            <div key={idx} className="flex flex-col space-y-4">
                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider pl-2 border-l-2 border-primary/30">
                                    {group.category}
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {group.techs.map((tech, tIdx) => (
                                        <div
                                            key={tIdx}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 hover:bg-primary/[0.02] transition-all group cursor-default"
                                        >
                                            <span className="text-xl group-hover:scale-110 transition-transform duration-300">{tech.icon}</span>
                                            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
            </section>
        </div>
    );
}
