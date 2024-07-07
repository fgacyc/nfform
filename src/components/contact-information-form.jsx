import { useFormStore } from '@/store/form-store';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

export default function ContactInformationForm({ ...props }) {
  const form = useFormStore((state) => state.form);

  return (
    <div className="w-full flex flex-col justify-center space-y-2" {...props}>
      <span className="text-2xl font-black mb-4">/ Contact Information</span>
      <FormField
        control={form.control}
        name="contact.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="+60**-***-****" {...field} />
            </FormControl>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contact.ic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>IC Number</FormLabel>
            <FormControl>
              <Input placeholder="IC Number" {...field} />
            </FormControl>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contact.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="Address" {...field} />
            </FormControl>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
