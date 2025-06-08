export const mimeMap = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  webm: 'video/webm',
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  txt: 'text/plain',
};

export const getMimeType = (
  fileType: keyof typeof mimeMap,
): string | undefined => {
  return mimeMap[fileType];
};
