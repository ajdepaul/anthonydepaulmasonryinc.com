import { Mutex } from 'async-mutex';
import fs from 'fs/promises';
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
const dataMutex = new Mutex();

async function getData(skipExclusive: boolean = false): Promise<Data> {
  const getResult = async () => {
    if (loadedData) { return loadedData; }
    loadedData = dataSchema.parse(JSON.parse(await fs.readFile('data.json', 'utf-8')));
    return loadedData;
  };
  return skipExclusive ? getResult() : dataMutex.runExclusive(getResult);
}

async function mutateData(mutation: (data: Data) => Data) {
  await dataMutex.runExclusive(async () => {
    loadedData = mutation(await getData(true));
    await fs.writeFile('data.json', JSON.stringify(loadedData));
  })
}

export { getData, mutateData };

