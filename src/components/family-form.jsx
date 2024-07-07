import { useFormStore } from '@/store/form-store';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function FamilyForm({ ...props }) {
  const form = useFormStore((state) => state.form);

  return (
    <div className="w-full flex flex-col mt-16 space-y-2" {...props}>
      <span className="text-2xl font-black mb-4">/ Family Information</span>
      <FormField
        control={form.control}
        name="family.anyIsChristian"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Is any of your family members a Christian?</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value === 'yes' ? true : false);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select yes or no" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
