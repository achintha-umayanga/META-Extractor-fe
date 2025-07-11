import { useState } from 'react';
import { uploadImage } from '../services/mediaService';

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
    } catch (err) {
      setError('Failed to extract metadata');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="image-uploader">
      <h2>Image Metadata Extractor</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!file || isLoading}>
          {isLoading ? 'Processing...' : 'Extract Metadata'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {metadata && (
        <div className="metadata-results">
          <h3>Metadata for {metadata.FileName}</h3>
          <div>
            <strong>Camera:</strong> {metadata.Metadata.Make} {metadata.Metadata.Model}
          </div>
          <div>
            <strong>Date Taken:</strong> {metadata.Metadata.DateTaken}
          </div>
          {metadata.Metadata.Latitude && metadata.Metadata.Longitude && (
            <div>
              <strong>Location:</strong> {metadata.Metadata.Latitude}, {metadata.Metadata.Longitude}
            </div>
          )}
          
          <h4>All Metadata:</h4>
          <ul>
            {Object.entries(metadata.Metadata.AdditionalMetadata).map(([key, value]) => (
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