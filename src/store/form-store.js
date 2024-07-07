import { create } from 'zustand';

export const useFormStore = create((set) => ({
  form: false,
  setForm: (form) => set({ form }),
}));
