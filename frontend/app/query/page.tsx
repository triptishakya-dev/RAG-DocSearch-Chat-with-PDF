'use client';

import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { Document, QueryResult, Citation } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Loader } from '@/components/ui/Loader';

export default function QueryPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<{ type: 'user' | 'bot'; content: string | QueryResult }[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

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
    <div className="max-w-4xl mx-auto space-y-6 h-[calc(100vh-140px)] flex flex-col">
       <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Query Documents</h1>
          <p className="mt-1 text-sm text-gray-500">Ask questions across your documents.</p>
        </div>
        <div className="w-64">
           <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
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

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
           {history.length === 0 && (
               <div className="h-full flex flex-col items-center justify-center text-gray-400">
                   <p>Ask a question to get started.</p>
               </div>
           )}
           {history.map((msg, idx) => (
               <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[80%] rounded-lg p-4 ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                       {msg.type === 'user' ? (
                           <p>{msg.content as string}</p>
                       ) : (
                           <div>
                               <p className="whitespace-pre-wrap">{(msg.content as QueryResult).answer}</p>
                               {(msg.content as QueryResult).confidence !== undefined && (
                                   <div className="mt-2 flex items-center gap-2">
                                       <Badge variant="info">
                                           Confidence: {((msg.content as QueryResult).confidence! * 100).toFixed(0)}%
                                       </Badge>
                                       {(msg.content as QueryResult).model && (
                                            <Badge variant="default">Model: {(msg.content as QueryResult).model}</Badge>
                                       )}
                                   </div>
                               )}
                               {(msg.content as QueryResult).citations && (msg.content as QueryResult).citations.length > 0 && (
                                   <div className="mt-4 border-t border-gray-200 pt-2">
                                       <p className="text-xs font-semibold uppercase text-gray-500 mb-1">Citations:</p>
                                       <ul className="space-y-2">
                                           {(msg.content as QueryResult).citations.map((cit, i) => (
                                               <li key={i} className="text-xs bg-white p-2 rounded border border-gray-200">
                                                   <p className="italic">"{cit.text}"</p>
                                                   <div className="mt-1 flex justify-between text-gray-400">
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
           ))}
           {loading && (
               <div className="flex justify-start">
                   <div className="bg-gray-100 rounded-lg p-4">
                       <Loader size="sm" />
                   </div>
               </div>
           )}
           {error && (
               <div className="flex justify-center">
                    <span className="text-red-500 text-sm">{error}</span>
               </div>
           )}
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    placeholder="Ask a question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={loading}
                    className="flex-1"
                />
                <Button type="submit" isLoading={loading} disabled={!question.trim()}>
                    Send
                </Button>
            </form>
        </div>
      </Card>
    </div>
  );
}
