'use client';

import BoxTextInput, { boxTextInputVariants } from "@/app/components/boxTextInput";
import Container from "@/app/components/container";
import { Button, buttonVariants } from "@/app/components/ui/button";
import { H } from "@/app/components/ui/header";
import { ImageData } from "@/app/util/data";
import FormState from "@/app/util/formState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, MouseEventHandler, useCallback, useState } from "react";
import { IoCheckmark, IoToggle, IoToggleOutline, IoWarning } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const ImageForm: React.FC<{
  id: string;
  imageData: ImageData;
  featuredImages: string[];
  publishedImages: string[];
  titleBg?: string;
  exploreBg?: string;
}> = ({
  id,
  imageData,
  featuredImages,
  publishedImages,
  titleBg,
  exploreBg
}) => {
    const router = useRouter();
    const [name, setName] = useState<string>(imageData.name ?? '');
    const [description, setDescription] = useState<string>(imageData.description ?? '');
    const [isPublished, setIsPublished] = useState<boolean>(publishedImages.includes(id));
    const [isFeatured, setIsFeatured] = useState<boolean>(featuredImages.includes(id));
    const [formState, setFormState] = useState<{
      main: FormState | null;
      titleBg: FormState | null;
      exploreBg: FormState | null;
      delete: FormState | null;
    }>({
      main: null,
      titleBg: null,
      exploreBg: null,
      delete: null
    });
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState<boolean>(false);

    const handleSubmit = useCallback((e: FormEvent) => {
      e.preventDefault();
      setFormState({ ...formState, main: { type: 'loading', message: 'Loading' } });

      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('isPublished', isPublished ? 'true' : 'false');
      formData.append('isFeatured', isFeatured ? 'true' : 'false');

      const response = fetch('/api/admin/edit/image', { method: 'PUT', body: formData });
      response.then(async (response) => {
        if (response.ok) {
          router.push('/admin');
          setFormState({ ...formState, main: { type: 'success', message: 'Saved Changes' } });
        } else {
          const message = response.headers.get('content-type')?.includes('application/json')
            ? (await response.json()).message
            : null;
          setFormState({
            ...formState,
            main: { type: 'error', message: message ? `Server Error: ${message}` : 'Server Error' }
          });
        }
      })

    }, [formState, id, name, description, isPublished, isFeatured, router]);

    const handleDelete = useCallback(() => {
      setFormState({ ...formState, delete: { type: 'loading', message: 'Loading' } });

      const formData = new FormData();
      formData.append('id', id);

      const response = fetch('/api/admin/delete', { method: 'DELETE', body: formData });
      response.then(async (response) => {
        if (response.ok) {
          router.push('/admin');
          setFormState({ ...formState, delete: { type: 'success', message: 'Image Deleted' } })
        } else {
          const message = response.headers.get('content-type')?.includes('application/json')
            ? (await response.json()).message
            : undefined;
          setFormState({
            ...formState,
            delete: { type: 'error', message: message ? `Server Error: ${message}` : 'Server Error' }
          });
        }
      })
    }, [formState, id, router]);

    const handleSetBackground = useCallback((name: 'title' | 'explore') => {
      if (name === 'title') { setFormState({ ...formState, titleBg: { type: 'loading', message: '' } }) }
      else { setFormState({ ...formState, exploreBg: { type: 'loading', message: '' } }) }

      const formData = new FormData();
      formData.append('background', name);
      formData.append('id', id);

      const response = fetch('/api/admin/edit/background', { method: 'PUT', body: formData });
      response.then(async (response) => {
        if (response.ok) {
          router.refresh();
          if (name === 'title') { setFormState({ ...formState, titleBg: null }) }
          else { setFormState({ ...formState, exploreBg: null }) }
        } else {
          if (name === 'title') { setFormState({ ...formState, titleBg: { type: 'error', message: '' } }) }
          else { setFormState({ ...formState, exploreBg: { type: 'error', message: '' } }) }
        }
      });

    }, [formState, id, router]);

    return (
      <form
        inert={formState.main?.type === 'loading' || formState.main?.type === 'success'}
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-stretch gap-2"
      >
        {
          deleteConfirmationModal && (
            <DeleteConfirmationModal
              closeModal={() => { setDeleteConfirmationModal(false); }}
              handleDelete={handleDelete}
              formState={formState.delete}
            />
          )
        }

        {/* columns */}
        <div className="grid grid-cols-2">

          {/* left column */}
          <div className="flex flex-col gap-2">
            <label>Name (optional): <BoxTextInput
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
            </label>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setIsFeatured(!isFeatured); }}
                className="flex items-center gap-x-2"
              >
                On Front Page: {isFeatured ? 'Yes' : 'No'}
                {
                  isFeatured ? (<IoToggle className="text-2xl" />)
                    : (<IoToggleOutline className="text-2xl rotate-180" />)
                }
              </button>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setIsPublished(!isPublished); }}
                className="flex items-center gap-x-2"
              >
                On Gallery Page: {isPublished ? 'Yes' : 'No'}
                {
                  isPublished ? (<IoToggle className="text-2xl" />)
                    : (<IoToggleOutline className="text-2xl rotate-180" />)
                }
              </button>
            </div>
          </div>

          {/* right column */}
          <div className="flex flex-col gap-2 items-center justify-between">
            {
              [
                { name: 'title' as 'title' | 'explore', selected: titleBg === id, state: formState.titleBg },
                { name: 'explore' as 'title' | 'explore', selected: exploreBg === id, state: formState.exploreBg }
              ].map(({ name, selected, state }) => (
                <Button
                  key={name}
                  type="button"
                  className={twMerge(
                    'w-60 flex items-center justify-center gap-2',
                    state?.type === 'error' ? 'border-red-500 text-red-500' : '',
                    selected ? 'border-green-500 text-green-500 hover:bg-transparent hover:cursor-default' : ''
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!selected) { handleSetBackground(name); }
                  }}
                >
                  {state?.type === 'error' && <IoWarning />}
                  {selected && (<IoCheckmark />)}
                  {state?.type === 'error' ? 'Error' : `Set as ${name === 'title' ? '1st' : '2nd'} Background`}
                </Button>
              ))
            }
          </div>
        </div>

        <label className="flex flex-col items-start">Description (optional):
          <textarea
            value={description}
            onChange={(e) => {
              e.preventDefault();
              setDescription(e.target.value);
            }}
            className={twMerge(boxTextInputVariants(), 'w-full min-h-24')}
          />
        </label>

        <div className="flex justify-center gap-x-4 mt-4">
          <Link href="/admin" className={twMerge(buttonVariants(), 'w-24 text-center')}>Cancel</Link>
          <Button type="submit" className="w-24 hover:bg-green-500/50">Save</Button>
          <Button
            type="button"
            onClick={() => { setDeleteConfirmationModal(true); }}
            className="w-24 hover:bg-red-500/50">
            Delete
          </Button>
        </div>

        {
          formState.main && (
            <div
              className={`text-center
              ${formState.main.type === 'success' ? 'text-green-500'
                  : formState.main.type === 'error' ? 'text-red-500'
                    : ''}`
              }
            >
              {formState.main.message}
            </div>
          )
        }
      </form >
    );
  }

const DeleteConfirmationModal: React.FC<{
  closeModal: () => void;
  handleDelete: MouseEventHandler<HTMLButtonElement>;
  formState: FormState | null;
}> = ({
  closeModal,
  handleDelete,
  formState
}) => {
    return (
      <div
        onClick={closeModal}
        className="fixed w-screen h-screen inset-0 flex items-center justify-center bg-black/50 z-50"
      >
        <Container onClick={(e) => { e.stopPropagation(); }} className="items-center">
          <H level="2" className="text-2xl">Are you sure you want to delete this image?</H>
          <p>This action is irreversible.</p>
          <div className="flex gap-x-4">
            <Button type="button" onClick={closeModal} className="w-24">Cancel</Button>
            <Button type="button" onClick={handleDelete} className="w-24 hover:bg-red-500/50">Delete</Button>
          </div>
          {
            formState && (
              <div
                className={`text-center
                  ${formState.type === 'success' ? 'text-green-500'
                    : formState.type === 'error' ? 'text-red-500'
                      : ''}`
                }
              >
                {formState.message}
              </div>
            )
          }
        </Container>
      </div>
    );
  }

export default ImageForm;
