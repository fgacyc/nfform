import { useFormStore } from '@/store/form-store';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function FaithBackgroundForm({ ...props }) {
  const form = useFormStore((state) => state.form);

  return (
    <div className="w-full flex flex-col justify-center space-y-2" {...props}>
      <span className="text-2xl font-black mb-4">/ Faith Background</span>
      <FormField
        control={form.control}
        name="faith.isChristian"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Are you a Christian?</FormLabel>
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
      <FormField
        control={form.control}
        name="faith.baptismStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Baptism Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="baptised">Baptised</SelectItem>
                <SelectItem value="not-baptised">Not baptised</SelectItem>
                <SelectItem value="planning-to-baptised">Planning to baptise</SelectItem>
              </SelectContent>
            </Select>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="faith.regularChurch"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you have a regular church?</FormLabel>
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
