import { format, getDaysInMonth, getMonth, getYear } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment';

import { cn } from '@/lib/utils';
import { useFormStore } from '@/store/form-store';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function BasicInformationForm({ ...props }) {
  const form = useFormStore((state) => state.form);
  const watchIndustry = form ? form.watch('basic.industry') : undefined;

  return (
    <div className="w-full flex flex-col mt-16 space-y-2" {...props}>
      <span className="text-2xl font-black mb-4">/ Basic Information</span>
      <FormField
        control={form.control}
        name="basic.nameEN"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name (English)</FormLabel>
            <FormControl>
              <Input placeholder="Name" {...field} />
            </FormControl>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="basic.nameCN"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name (Chinese)</FormLabel>
            <FormControl>
              <Input placeholder="姓名" {...field} />
            </FormControl>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="basic.gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="basic.dob"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex items-center space-x-2 p-2 pb-0">
                  <Select
                    defaultValue={
                      field.value ? field.value.getUTCMonth() : new Date().getUTCMonth()
                    }
                    onValueChange={(value) => {
                      const date = field.value ?? new Date();
                      field.onChange(new Date(getYear(date), value, getDaysInMonth(date)));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i} value={i}>
                          {moment().month(i).format('MMM')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue={
                      field.value ? field.value.getUTCFullYear() : new Date().getUTCFullYear()
                    }
                    onValueChange={(value) => {
                      const date = field.value ?? new Date();
                      field.onChange(new Date(value, getMonth(date), getDaysInMonth(date)));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 200 }, (_, i) => (
                        <SelectItem
                          key={new Date().getUTCFullYear() - i}
                          value={new Date().getUTCFullYear() - i}
                        >
                          {new Date().getUTCFullYear() - i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Calendar
                  mode="single"
                  month={field.value}
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="basic.industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Industry</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="tech">Technology / Information Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Financial Services</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail / Wholesale</SelectItem>
                <SelectItem value="media">Media / Entertainment</SelectItem>
                <SelectItem value="hospitality">Hospitality / Food Services</SelectItem>
                <SelectItem value="construction">Construction / Real Estate</SelectItem>
                <SelectItem value="government">Government / Non-profit Organisation</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="transportation">Transportation / Logistics</SelectItem>
                <SelectItem value="arts">Arts / Design</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="other">Other (Please specify)</SelectItem>
              </SelectContent>
            </Select>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      {watchIndustry === 'other' && (
        <FormField
          control={form.control}
          name="basic.industryOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry (Other)</FormLabel>
              <FormControl>
                <Input placeholder="Industry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
