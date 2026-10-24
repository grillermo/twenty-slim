import DOMPurify from 'dompurify';

export const sanitizeFile = async ({
  file,
  ext,
  mimeType,
}: {
  file: Buffer | Uint8Array | string;
  ext: string;
  mimeType: string | undefined;
}): Promise<Buffer | Uint8Array | string> => {
  if (ext === 'svg' || mimeType === 'image/svg+xml') {
    // jsdom costs ~36 MB of heap per process; load it only when an SVG arrives.
    const { JSDOM } = await import('jsdom');
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);

    let fileString: string;

    if (typeof file === 'string') {
      fileString = file;
    } else if (Buffer.isBuffer(file)) {
      fileString = file.toString('utf-8');
    } else {
      fileString = Buffer.from(file).toString('utf-8');
    }

    return purify.sanitize(fileString);
  }

  return file;
};
