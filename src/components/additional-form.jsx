import { useFormStore } from '@/store/form-store';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function AdditionalForm({ ...props }) {
  const form = useFormStore((state) => state.form);
  const watchMethod = form ? form.watch('methodOfEngagement') : undefined;

  return (
    <div className="w-full flex flex-col justify-center space-y-2" {...props}>
      <span className="text-2xl font-black mb-4">/ Additional Information and Consent</span>
      <FormField
        control={form.control}
        name="additional.methodOfEngagement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How did you learn about our church?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a method" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="referral">Referred by a friend</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="flyer">Flyer</SelectItem>
                <SelectItem value="other">Other (Please specify)</SelectItem>
              </SelectContent>
            </Select>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      {watchMethod === 'other' && (
        <FormField
          control={form.control}
          name="additional.methodOfEngagementOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Learned about the church through (Other)</FormLabel>
              <FormControl>
                <Input placeholder="Learned about the church through" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="additional.usageConsent"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              I consent to the church using the above information to contact me and for
              church-related activities
            </FormLabel>
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
