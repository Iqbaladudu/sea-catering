'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating'
import { testimonialFormSchema as formSchema } from '@/lib/schemas'
import { useMutation } from '@tanstack/react-query'
import submitTestimonialAction from '@/actions/submit-testimonial.action'

export default function TestimonialForm() {
  const submitTestomonialMutation = useMutation({
    mutationFn: submitTestimonialAction,
    onSuccess: (data) => {
      if (data.success) {
        form.reset()
        toast.success('Testimonial submitted successfully!')
      } else {
        toast.error(data.error || 'Failed to submit testimonial')
      }
    },
    onError: (_error) => {
      toast.error('Failed to submit the form. Please try again.')
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { rating: 5 },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitTestomonialMutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Dinda Silvia Melisa" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Rating</FormLabel>
              <FormControl className="w-full">
                <div className="flex items-center gap-2">
                  <Rating value={field.value} onValueChange={field.onChange} defaultValue={5}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton key={index} />
                    ))}
                  </Rating>
                </div>
              </FormControl>
              <FormDescription>Please provide your rating.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={submitTestomonialMutation.isPending}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
