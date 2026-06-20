import { z } from "zod";
import { MAX_UPLOAD_BYTES, SUPPORTED_FILE_TYPES } from "@/constants/design-tokens";

export const uploadFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_UPLOAD_BYTES, "Files must be 50MB or smaller.")
  .refine((file) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    return Boolean(ext && SUPPORTED_FILE_TYPES.includes(ext as never));
  }, "Unsupported file type.");
