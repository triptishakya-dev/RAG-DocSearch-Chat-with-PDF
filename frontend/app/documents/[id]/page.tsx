'use client';

import { useEffect, useState, use } from 'react';
import { api } from '@/lib/api';
import { Document, IngestionJob } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Loader } from '@/components/ui/Loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DocumentStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [ingesting, setIngesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      const doc = await api.getDocument(id);
      setDocument(doc);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch document details');
    } finally {
      setLoading(false);
    }
  };

  const handleStartIngestion = async () => {
    try {
      setIngesting(true);
      await api.startIngestion(id);
      // Refresh document to show new job status
      await fetchDocument();
    } catch (err: any) {
      alert(err.message || 'Failed to start ingestion');
    } finally {
        setIngesting(false);
    }
  };

  if (loading) {
    return <div className="py-12"><Loader size="lg" /></div>;
  }

  if (error || !document) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
        {error || 'Document not found'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{document.title}</h1>
          <p className="mt-1 text-sm text-gray-500">Document ID: {document.id}</p>
        </div>
         <Button onClick={handleStartIngestion} isLoading={ingesting}>
            {document.ingestionJobs && document.ingestionJobs.length > 0 ? 'Restart Ingestion' : 'Start Ingestion'}
        </Button>
      </div>

      <Card title="Details">
         <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Source URL</dt>
              <dd className="mt-1 text-sm text-gray-900">{document.sourceUrl || 'N/A'}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900">{new Date(document.createdAt).toLocaleString()}</dd>
            </div>
         </dl>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Ingestion History</h2>
        {document.ingestionJobs && document.ingestionJobs.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {document.ingestionJobs.map((job: IngestionJob) => (
                <li key={job.id} className="px-4 py-4 sm:px-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <Badge variant={job.status === 'SUCCEEDED' ? 'success' : job.status === 'FAILED' ? 'error' : 'info'}>
                            {job.status}
                         </Badge>
                         <span className="text-sm text-gray-500">
                            Attempt {job.attempts}
                         </span>
                      </div>
                      <div className="text-sm text-gray-500">
                         {new Date(job.createdAt).toLocaleString()}
                      </div>
                   </div>
                   {job.lastError && (
                       <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                           Error: {job.lastError}
                       </p>
                   )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No ingestion jobs found.</p>
        )}
      </div>
    </div>
  );
}
