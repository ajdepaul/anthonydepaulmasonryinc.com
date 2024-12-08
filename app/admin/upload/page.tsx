'use client';

import Container from "@/app/components/container";
import ImageBox from "@/app/components/imageBox";
import { Button, buttonVariants } from "@/app/components/ui/button";
import { H } from "@/app/components/ui/header";
import FormState from "@/app/util/formState";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const UploadPage: React.FC = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[] | null>(null);
  const [formState, setFormState] = useState<FormState | null>(null);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (files && files.length !== 0) {
      setFormState({ type: 'loading', message: 'Loading' });

      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      const response = fetch('/api/admin/upload', { method: 'POST', body: formData });

      response.then(async (response) => {
        if (response.ok) {
          router.push('/admin');
          setFormState({ type: 'success', message: 'Uploaded Successfully' });
        } else {
          const message = response.headers.get('content-type')?.includes('application/json')
            ? (await response.json()).message
            : undefined;
          setFormState({ type: 'error', message: message ? `Server Error: ${message}` : 'Server Error' });
        }
      });
    } else {
      setFormState({ type: 'error', message: 'Form Incomplete' });
    }
  }, [files, router]);

  return (
    <div className="flex flex-col items-center gap-y-8">
      <H level="1" className="text-center text-4xl">Upload Images</H>

      <Container>
        <form
          inert={formState?.type === 'loading' || formState?.type === 'success'}
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center min-w-72 min-h-24"
        >

          <label className={twMerge(buttonVariants(), 'hover:cursor-pointer')}>
            Select Files
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files !== null) {
                  setFiles(Array.from(e.target.files));
                }
              }}
            />
          </label>

          {
            files && files.length !== 0 && (
              <>
                <div
                  className="grid gap-4 p-4"
                  style={{ gridTemplateColumns: `repeat(${Math.min(files.length, 4)}, minmax(0, 1fr))` }}
                >
                  {
                    Array.from(files).map((file, i) => (
                      <div key={i} className="flex flex-col items-stretch">
                        <ImageBox
                          src={URL.createObjectURL(file)}
                          alt={`Upload image preview ${i}`}
                          className="w-48 h-32"
                        />
                        <div className="flex justify-center pt-2">
                          <button onClick={(e) => {
                            e.preventDefault();
                            const newFiles = files
                              .map((file, j) => ({ file, j }))
                              .filter(({ j }) => i !== j)
                              .map(({ file }) => file);
                            setFiles(newFiles);
                          }}>
                            <IoCloseCircleOutline className="text-red-500 text-2xl" />
                          </button>
                        </div>
                      </div>
                    ))

                  }
                </div>
                <Button type="submit">Upload</Button>
              </>
            )
          }

          {
            formState && (
              <div
                className={
                  formState?.type === 'success' ? 'text-green-500'
                    : formState?.type === 'error' ? 'text-red-500'
                      : ''
                }
              >
                {formState.message}
              </div>
            )
          }
        </form>
      </Container>
    </div >
  );
};

export default UploadPage;
