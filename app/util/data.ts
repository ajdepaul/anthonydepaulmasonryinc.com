import data from '@/data.json';
import { writeFile } from 'fs/promises';
import { z } from 'zod';

export type ImageData = {
  filename: string;
  name?: string;
  description?: string;
  placeholder: string;
  width: number;
  height: number;
  dateUploaded: string;
  lastUpdated: string;
}

export type Data = {
  titleBg?: string;
  titleBgDim: number;
  exploreBg?: string;
  exploreBgDim: number;
  images: { [id: string]: ImageData; };
  publishedImages: string[];
  featuredImages: string[];
};

const imageIdSchema = z.string().length(12);

const imageDataSchema = z.record(imageIdSchema, z.object({
  filename: z.string().min(12).includes('.'),
  name: z.string().trim().min(1).optional(),
  description: z.string().trim().min(1).optional(),
  placeholder: z.string().min(1),
  width: z.number().int().min(1),
  height: z.number().int().min(1),
  dateUploaded: z.string().datetime(),
  lastUpdated: z.string().datetime(),
}));

const dataSchema = z.object({
  titleBg: imageIdSchema.optional(),
  titleBgDim: z.number().nonnegative().lte(1),
  exploreBg: imageIdSchema.optional(),
  exploreBgDim: z.number().nonnegative().lte(1),
  images: imageDataSchema,
  publishedImages: imageIdSchema.array(),
  featuredImages: imageIdSchema.array(),
});

let loadedData: Data | null;

function getData(): Data {
  if (loadedData) {
    return loadedData;
  }
  loadedData = dataSchema.parse(data);
  return loadedData;
}

async function mutateData(mutation: (data: Data) => Data) {
  const data = getData();
  loadedData = dataSchema.parse(mutation(data));
  await writeFile('data.json', JSON.stringify(loadedData));
}

export { getData, mutateData };

