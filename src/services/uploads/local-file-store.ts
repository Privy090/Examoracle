import type { UploadedFileRecord } from "@/types/domain";

const FILES_KEY = "examoracle.localFiles";

export const localFileStore = {
  list(): UploadedFileRecord[] {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(FILES_KEY);
    return raw ? (JSON.parse(raw) as UploadedFileRecord[]) : [];
  },
  save(files: UploadedFileRecord[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(FILES_KEY, JSON.stringify(files));
  },
  async putBlob(id: string, file: File) {
    if (typeof indexedDB === "undefined") return;
    const request = indexedDB.open("examoracle-files", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("files");
    await new Promise<void>((resolve, reject) => {
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const tx = request.result.transaction("files", "readwrite");
        tx.objectStore("files").put(file, id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      };
    });
  }
};
