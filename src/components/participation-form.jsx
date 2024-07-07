import { useFormStore } from '@/store/form-store';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function ParticipationForm({ ...props }) {
  const form = useFormStore((state) => state.form);
  const watchInterest = form ? form.watch('participation.interest') : undefined;

  return (
    <div className="w-full flex flex-col mt-16 space-y-2" {...props}>
      <span className="text-2xl font-black mb-4">/ Participation Interests</span>
      <FormField
        control={form.control}
        name="participation.interest"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Interested in</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an interest" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="worship-service">Worship service</SelectItem>
                <SelectItem value="bible-study">Bible study</SelectItem>
                <SelectItem value="prayer-meeting">Prayer meeting</SelectItem>
                <SelectItem value="volunteer">Volunteer service</SelectItem>
                <SelectItem value="youth">Youth activities</SelectItem>
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
          name="participation.interestOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interested in (Other)</FormLabel>
              <FormControl>
                <Input placeholder="Interested in" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
