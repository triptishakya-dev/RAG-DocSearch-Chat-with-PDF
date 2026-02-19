import React from 'react';
import { FileText, Cpu, Database, MessageSquare, ArrowRight, Zap, Shield, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HowItWorksPage() {
    const steps = [
        {
            icon: <FileText className="w-8 h-8 text-blue-500" />,
            title: "1. Upload Your Documents",
            description: "Upload your PDF or TXT files securely. Our system accepts multiple documents and processes them instantly.",
            borderColor: "border-blue-500/20",
            bgColor: "bg-blue-500/5",
        },
        {
            icon: <Cpu className="w-8 h-8 text-purple-500" />,
            title: "2. Intelligent Processing",
            description: "We use advanced algorithms to read your documents, break them into manageable chunks, and understand their context.",
            borderColor: "border-purple-500/20",
            bgColor: "bg-purple-500/5",
        },
        {
            icon: <Database className="w-8 h-8 text-emerald-500" />,
            title: "3. Vector Storage",
            description: "Your document's content is converted into vector embeddings and stored in a high-performance vector database for semantic search.",
            borderColor: "border-emerald-500/20",
            bgColor: "bg-emerald-500/5",
        },
        {
            icon: <MessageSquare className="w-8 h-8 text-orange-500" />,
            title: "4. Ask & Receive",
            description: "Chat with your documents naturally. Our AI retrieves relevant information and generates accurate, context-aware answers.",
            borderColor: "border-orange-500/20",
            bgColor: "bg-orange-500/5",
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
                <div className="container relative z-10 px-4 mx-auto text-center max-w-5xl">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 text-sm font-medium transition-colors border rounded-full text-muted-foreground border-border hover:bg-muted bg-background/50 backdrop-blur-sm">
                        <span className="flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            Powered by Advanced AI
                        </span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50 pb-2">
                        How DocSearch+ Works
                    </h1>
                    <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Unlock the power of your documents with our intelligent search and chat platform. Here's a look at the magic behind the scenes.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/upload">
                            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold rounded-full">
                                Get Started
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

            {/* Steps Section */}
            <section className="py-20 bg-muted/30 border-y border-border/40">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative isolate">
                        {/* Connector Lines (Desktop) */}
                        <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10 opacity-50"></div>

                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                <div className={`h-full p-8 rounded-3xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-card/60`}>
                                    <div className="mb-6 inline-flex p-4 rounded-2xl bg-background border shadow-sm group-hover:scale-110 transition-transform duration-300 ring-1 ring-border/50">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="lg:hidden flex justify-center py-4">
                                        <ArrowRight className="w-6 h-6 text-muted-foreground/30 rotate-90" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-background">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Why Choose DocSearch+?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Detailed insights and security at every step. We prioritize your data privacy and search speed.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Shield className="w-8 h-8 text-primary" />,
                                title: "Secure & Private",
                                description: "Your documents are processed locally or securely in the cloud with strict privacy controls."
                            },
                            {
                                icon: <Zap className="w-8 h-8 text-primary" />,
                                title: "Lightning Fast",
                                description: "Get answers in seconds, thanks to optimized vector search and state-of-the-art LLMs."
                            },
                            {
                                icon: <Search className="w-8 h-8 text-primary" />,
                                title: "Pinpoint Accuracy",
                                description: "Our semantic search understands context, not just keywords, for precise retrieval."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-muted/10 border border-border/60 hover:bg-muted/30 transition-colors group">
                                <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-3 text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
