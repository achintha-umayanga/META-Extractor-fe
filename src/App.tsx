// import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import './App.css';

// Define types for the metadata response
// interface ImageMetadata {
//   FilePath: string;
//   Make?: string;
//   Model?: string;
//   DateTaken?: string;
//   Latitude?: number;
//   Longitude?: number;
//   AdditionalMetadata: Record<string, string>;
// }

// interface UploadResponse {
//   FileName: string;
//   Metadata: ImageMetadata;
// }

function App() {

  return (
    <div className="app">
      <header className="app-header">
        <h1>Image Metadata Extractor</h1>
        <p>Upload images to view their metadata</p>
      </header>

      <main className="app-content">
        <div className="upload-section">
          <ImageUploader />
        </div>

        {/* {recentUploads.length > 0 && (
          <div className="recent-uploads">
            <h2>Recent Uploads</h2>
            <div className="upload-grid">
              {recentUploads.map((upload, index) => (
                <div key={index} className="upload-card">
                  <h3>{upload.FileName}</h3>
                  <div className="metadata-summary">
                    {upload.Metadata.Make && (
                      <p><strong>Camera:</strong> {upload.Metadata.Make} {upload.Metadata.Model}</p>
                    )}
                    {upload.Metadata.DateTaken && (
                      <p><strong>Date:</strong> {new Date(upload.Metadata.DateTaken).toLocaleString()}</p>
                    )}
                    {upload.Metadata.Latitude && upload.Metadata.Longitude && (
                      <p>
                        <strong>Location:</strong> 
                        {upload.Metadata.Latitude.toFixed(4)}, {upload.Metadata.Longitude.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </main>

      <footer className="app-footer mt-4">
        <p>© {new Date().getFullYear()} Image Metadata Extractor - <a href="https://github.com/achintha-umayanga" target="_blank" rel="noopener noreferrer">Achintha Umayanga</a></p>
      </footer>
    </div>
  );
}

export default App;