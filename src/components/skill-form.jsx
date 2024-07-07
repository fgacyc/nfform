import { useFormStore } from '@/store/form-store';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function SkillForm({ ...props }) {
  const form = useFormStore((state) => state.form);
  const watchInterest = form ? form.watch('skill.interest') : undefined;

  return (
    <div className="w-full flex flex-col justify-center space-y-2" {...props}>
      <span className="text-2xl font-black mb-4">/ Skills and Interests</span>
      <FormField
        control={form.control}
        name="skill.interest"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Skilled or interested in</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an interest" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other">Other (Please specify)</SelectItem>
              </SelectContent>
            </Select>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      {watchInterest === 'other' && (
        <FormField
          control={form.control}
          name="skill.interestOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skilled or interested in (Other)</FormLabel>
              <FormControl>
                <Input placeholder="Skilled or interested in" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
