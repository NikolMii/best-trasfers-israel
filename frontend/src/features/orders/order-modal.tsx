import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sendEmail } from './utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { phoneRegex, CLASSES, COMPANY_CONFIG } from './consts';
import styles from './styles.module.css';
import { usePrices } from '../prices/usePrices';
import { Price } from '../prices/prices-page';

export interface Props {
  open: boolean;
  onClose: () => void;
}

export default function OrderModal({ open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const { getPrice, destinations } = usePrices();

  const [price, setPrice] = useState<null | number>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const FormSchema = z.object({
    name: z.string().min(2, {
      message: 'Username name be at least 2 characters.',
    }),
    email: z.string().email('email must be valid'),
    phone: z.string().regex(phoneRegex, 'phone number must be valid'),
    from: z.union([
      z.string().refine((val) => destinations.includes(val), {
        message: 'Invalid value',
      }),
      z.string().min(2, 'from place be at least 2 characters.'),
    ]),
    to: z.union([
      z.string().refine((val) => destinations.includes(val), {
        message: 'Invalid value',
      }),
      z.string().min(2, 'from place be at least 2 characters.'),
    ]),
    class: z.enum(CLASSES),
    pax: z.coerce.number().int().positive('pax must be > 0'),
    date: z.date(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const updatePrice = useCallback(() => {
    const { from, to, class: carClass } = form.getValues();
    if (!from || !to || !carClass) return null;
    console.log(from, to, getPrice({ from, to }), carClass);

    setPrice((getPrice({ from, to })?.[carClass.toLowerCase() as keyof Price] as number) ?? null);
  }, [form, getPrice]);

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      // Save contact info for future use
      localStorage.setItem(
        'twc-contact-info',
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        })
      );

      await sendEmail({
        to: COMPANY_CONFIG.email,
        subject: 'New Transfer Booking',
        text: `
          New booking request:
          Name: ${formData.name}
          Email: ${formData.email}
          Phone: ${formData.phone}
          From: ${formData.from}
          To: ${formData.to}
          Class: ${formData.class}
          Pax: ${formData.pax}
          Date: ${format(formData.date, 'PPP')}
          ${price ? `Price: ₪${price}` : 'Price: Get an offer'}
        `,
      });

      await sendEmail({
        to: formData.email,
        subject: 'TWC Transfer Booking Confirmation',
        text: `
            Dear ${formData.name},
  
            Thank you for choosing TWC for your transportation needs. We have received your booking request:
  
            From: ${formData.from}
            To: ${formData.to}
            Class: ${formData.class}
            Pax: ${formData.pax}
            Date: ${format(formData.date, 'PPP')}
            ${price ? `Price: ₪${price}` : 'We will contact you with a personalized offer'}
  
            Our team will review your request and contact you shortly to confirm the details.
            If you need immediate assistance, please call us at +972-123-456-789.
  
            Best regards,
            TWC Team
          `,
      });

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        form.reset();
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending emails:', error);
    } finally {
      setLoading(false);
    }
    setLoading(true);
  }

  if (showSuccess) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <div>
            <div>
              <Check />
            </div>
            <h2>Thank You!</h2>
            <p>
              Your booking request has been received. We will contact you shortly to confirm the
              details. A confirmation email has been sent to your inbox.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={styles.dialog}>
        <DialogHeader>
          <DialogTitle>Book Your Transfer</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={() => updatePrice()}
            className={styles.formGrid}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={styles.cell}>
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Class</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        updatePrice();
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CLASSES.map((carClass) => (
                          <SelectItem value={carClass}>{carClass}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Passangers</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={styles.cell}>
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <div>
                        <Input list="destinations" {...field} />
                        <datalist id="destinations">
                          {destinations.map((opt) => (
                            <option key={opt} value={opt} />
                          ))}
                        </datalist>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <div>
                        <Input list="destinations" {...field} />
                        <datalist id="destinations">
                          {destinations.map((opt) => (
                            <option key={opt} value={opt} />
                          ))}
                        </datalist>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className={styles.cell}>
              {price !== null && price !== undefined ? (
                <div className={styles.priceBoxFixed}>
                  <p className={styles.priceLabelFixed}>Fixed Price Available</p>
                  <p className={styles.priceValue}>₪{price}</p>
                </div>
              ) : (
                <div>
                  <p>Custom Route</p>
                  <p>Get an Offer</p>
                </div>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Book Transfer'}
              </Button>
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      fromDate={new Date()}
                      disabled={{ before: new Date(new Date().setDate(new Date().getDate() + 1)) }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
