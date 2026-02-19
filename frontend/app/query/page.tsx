'use client';

import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { Document, QueryResult, Citation } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader } from '@/components/ui/loader';
import { Bot, User, Send, FileText, Sparkles, AlertCircle } from 'lucide-react';

export default function QueryPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<{ type: 'user' | 'bot'; content: string | QueryResult }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, loading]);

  const fetchDocuments = async () => {
    try {
      const docs = await api.getDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error('Failed to fetch documents', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    const currentQuestion = question;
    setQuestion('');

    // Add user question to history
    setHistory(prev => [...prev, { type: 'user', content: currentQuestion }]);

    try {
      const response = await api.query(currentQuestion, selectedDocId || undefined);
      setResult(response);
      setHistory(prev => [...prev, { type: 'bot', content: response }]);
    } catch (err: any) {
      setError(err.message || 'Failed to query');
      setHistory(prev => [...prev, { type: 'bot', content: { answer: 'Sorry, something went wrong.', citations: [] } as QueryResult }]); // Placeholder error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto space-y-6 h-[calc(100vh-6rem)] p-6 flex flex-col">
      <div className="flex justify-between items-center shrink-0 bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border/40">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Query Documents
          </h1>
          <p className="text-sm text-muted-foreground">Ask deep questions across your entire knowledge base.</p>
        </div>
        <div className="w-72">
          <select
            className="block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border transition-all hover:bg-muted/50"
            value={selectedDocId}
            onChange={(e) => setSelectedDocId(e.target.value)}
          >
            <option value="">All Documents</option>
            {documents.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden bg-background/50 border-border/60 shadow-xl shadow-black/5">
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {history.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <Bot className="w-8 h-8 opacity-50" />
              </div>
              <p className="font-medium">Ask a question to start exploring your documents.</p>
            </div>
          )}
          {history.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`flex gap-4 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm ${msg.type === 'user' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border'}`}>
                  {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`rounded-2xl p-5 shadow-sm text-sm leading-relaxed ${msg.type === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-card border border-border text-card-foreground rounded-tl-none'}`}>
                  {msg.type === 'user' ? (
                    <p>{msg.content as string}</p>
                  ) : (
                    <div>
                      <p className="whitespace-pre-wrap">{(msg.content as QueryResult).answer}</p>
                      {(msg.content as QueryResult).confidence !== undefined && (
                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">
                            Confidence: {((msg.content as QueryResult).confidence! * 100).toFixed(0)}%
                          </Badge>
                          {(msg.content as QueryResult).model && (
                            <Badge variant="outline" className="text-zinc-500 border-zinc-200">Model: {(msg.content as QueryResult).model}</Badge>
                          )}
                        </div>
                      )}
                      {(msg.content as QueryResult).citations && (msg.content as QueryResult).citations.length > 0 && (
                        <div className="mt-4 border-t border-border/50 pt-3">
                          <p className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1.5">
                            <FileText className="w-3 h-3" /> Citations
                          </p>
                          <ul className="space-y-2">
                            {(msg.content as QueryResult).citations.map((cit, i) => (
                              <li key={i} className="text-xs bg-muted/50 p-3 rounded-lg border border-border/50 transition-colors hover:bg-muted/80">
                                <p className="italic text-foreground/80 mb-1">"{cit.text}"</p>
                                <div className="flex justify-between text-muted-foreground font-medium">
                                  <span>Doc ID: {cit.documentId.substring(0, 8)}...</span>
                                  {cit.page && <span>Page {cit.page}</span>}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
              <div className="flex gap-4 max-w-[85%]">
                <div className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border shadow-sm">
                  <Bot className="w-4 h-4 text-foreground" />
                </div>
                <div className="bg-card border border-border px-5 py-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-center my-4">
              <div className="flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-2 rounded-full border border-destructive/20 shadow-sm text-sm font-medium">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
        <div className="p-4 border-t border-border/40 bg-muted/20 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="relative flex items-center max-w-3xl mx-auto">
            <Input
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
              className="flex-1 pr-12 h-12 bg-background border-border/60 focus-visible:ring-primary shadow-sm rounded-xl"
            />
            <Button
              type="submit"
              disabled={!question.trim() || loading}
              className="absolute right-1 w-10 h-10 rounded-lg p-0 shadow-sm transition-transform hover:scale-105"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-[10px] text-center text-muted-foreground mt-2">
            AI responses are generated based on your documents.
          </p>
        </div>
      </Card>
    </div>
  );
}
