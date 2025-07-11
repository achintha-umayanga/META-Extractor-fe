export interface Metadata {
  fileName: string;
  metadata: {
    filePath?: string;
    make?: string;
    model?: string;
    dateTimeOriginal?: string;
    latitude?: number | null;
    longitude?: number | null;
    additionalMetadata: Record<string, unknown>;
  };
}
