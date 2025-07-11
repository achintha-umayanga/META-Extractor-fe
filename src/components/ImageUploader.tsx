import { useState, useEffect } from 'react';
import { uploadImage } from '../services/mediaService';
import type { Metadata } from '../types/Metadata';

// Define a type for the metadata structure matching the backend response
// interface Metadata {
//   fileName: string;
//   metadata: {
//     filePath?: string;
//     make?: string;
//     model?: string;
//     dateTimeOriginal?: string;
//     latitude?: number | null;
//     longitude?: number | null;
//     additionalMetadata: Record<string, unknown>;
//   };
// }

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await uploadImage(file);
      setMetadata(result);

      // const url = URL.createObjectURL(file);
      // setPreviewUrl(url);
    } catch (err) {
      setError('Failed to extract metadata');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="image-uploader flex flex-col items-center">
      {/* <h2>Image Metadata Extractor</h2> */}
      <form onSubmit={handleSubmit} className='m-4 flex flex-row items-center gap-4'>
        <label className="custom-file-upload cursor-pointer w-64 flex items-center justify-center px-4 py-2 rounded bg-gray-800 text-white border border-gray-300 transition-colors duration-150 hover:bg-gray-700 focus:bg-gray-700">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {file ? file.name : "Choose File"}
        </label>
        <button type="submit" disabled={!file || isLoading} className="px-4 py-2 w-64 rounded bg-gray-800 text-white border border-gray-300 transition-colors duration-150 hover:bg-gray-700 focus:bg-gray-700">
          {isLoading ? 'Processing...' : 'Extract Metadata'}
        </button>
      </form>

      {previewUrl && (
        <div className="flex justify-center">
          <div className='image-preview w-1/2 h-auto mb-4'>
            <img src={previewUrl} alt="Preview" className='w-full h-auto rounded-[10px]'/>
          </div>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {/* Only render metadata section if metadata is not null */}
      {metadata && (
        <div className="metadata-results">
          {/* <h3>Metadata for {metadata.fileName}</h3>
          <div>
            <strong>Camera:</strong> {metadata.metadata.make || 'N/A'} {metadata.metadata.model || ''}
          </div>
          <div>
            <strong>Date Taken:</strong> {metadata.metadata.dateTimeOriginal || 'N/A'}
          </div>
          {metadata.metadata.latitude && metadata.metadata.longitude && (
            <div>
              <strong>Location:</strong> {metadata.metadata.latitude}, {metadata.metadata.longitude}
            </div>
          )}
          <div>
            <strong>File Path:</strong> {metadata.metadata.filePath || 'N/A'}
          </div> */}
          <h4>All Metadata:</h4>
          <ul>
            {Object.entries(metadata.metadata.additionalMetadata || {}).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}