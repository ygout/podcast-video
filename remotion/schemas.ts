import { z } from "zod";

export const audioVideoSchema = z.object({
  audioUrl: z.union([z.string(), z.undefined(), z.null()]),
});
