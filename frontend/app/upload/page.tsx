'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.uploadDocument(file);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Document</h1>
        <p className="mt-1 text-sm text-gray-500">Upload a PDF or text document for ingestion.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="file"
            label="Select Document"
            accept=".pdf,.txt,.md,.json"
            onChange={handleFileChange}
            error={error || undefined}
            disabled={loading}
          />

          <div className="flex items-center justify-end space-x-4">
             <Link href="/">
              <Button type="button" variant="secondary" disabled={loading}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" isLoading={loading}>
              Upload Document
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
