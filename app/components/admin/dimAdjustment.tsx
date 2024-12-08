'use client';

import { boxTextInputVariants } from "@/app/components/boxTextInput";
import { Button } from "@/app/components/ui/button";
import FormState from "@/app/util/formState";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import { IoCheckmark, IoCog, IoWarning } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const DimAdjustment: React.FC<{ initValue: number, background: 'title' | 'explore' }> = ({ initValue, background }) => {
  const router = useRouter();
  const [state, setState] = useState<{
    formState: FormState | null;
    dimInput: number;
  }>({
    formState: null,
    dimInput: initValue
  });

  const buttonDisabled = initValue === state.dimInput || state.formState?.type === 'loading';

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!buttonDisabled) {
      setState({ ...state, formState: { type: 'loading', message: '' } })

      const formData = new FormData();
      formData.append('background', background);
      formData.append('dim', `${state.dimInput}`);

      const response = fetch('/api/admin/edit/dim', { method: 'PUT', body: formData });
      response.then((response) => {
        if (response.ok) {
          router.refresh();
          setState({ ...state, formState: { type: 'success', message: '' } });
        } else {
          setState({ ...state, formState: { type: 'error', message: '' } });
        }
      });
    }
  }, [router, buttonDisabled, state, background]);

  return (
    <form onSubmit={onSubmit} inert={state.formState?.type === 'loading'} className="flex items-center gap-2">
      <input
        type="number" min="0" max="100" step="1"
        value={state.dimInput}
        onChange={(e) => {
          const value = parseInt(e.currentTarget.value);
          const updatedFormState: FormState | null =
            state.formState?.type === 'error' || state.formState?.type === 'success'
              ? null : state.formState;
          setState({ formState: updatedFormState, dimInput: isNaN(value) ? 0 : value })
        }}
        className={
          twMerge(boxTextInputVariants(), `w-24 text-center ${state.formState?.type === 'loading' ? 'opacity-50' : ''}`)}
      />
      <Button className={
        twMerge(
          buttonDisabled ? 'opacity-50 hover:cursor-default hover:bg-transparent' : '',
          state.formState?.type === 'loading' ? 'hover:cursor-wait'
            : state.formState?.type === 'error' ? 'border-red-500 text-red-500' :
              state.formState?.type === 'success' ? 'border-green-500 text-green-500' : ''
        )
      }
      >
        {state.formState?.type === 'loading' ? (<IoCog className="animate-spin" />)
          : state.formState?.type === 'error' ? (<IoWarning />)
            : (<IoCheckmark />)}
      </Button>
    </form >
  );
};

export default DimAdjustment;