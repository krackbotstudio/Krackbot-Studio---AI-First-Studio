import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Zap, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getQuickBuildBySlug } from "@/data/quickAIBuilds";
import { createProject } from "@/lib/quickProjectsApi";
import { toast } from "sonner";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  company: z.string().optional(),
  notes: z.string().min(10, "Tell us a bit about what you need (at least 10 characters)"),
});

type BookingForm = z.infer<typeof bookingSchema>;

function submitErrorMessage(e: unknown): string {
  if (e instanceof DOMException && e.name === "AbortError") {
    return "Request timed out. Check your network, VPN, and that VITE_SUPABASE_URL in .env matches your Supabase project.";
  }
  if (e instanceof Error) return e.message;
  if (typeof e === "object" && e !== null && "message" in e && typeof (e as { message: unknown }).message === "string") {
    return (e as { message: string }).message;
  }
  return "Could not save your request. Check Supabase configuration.";
}

const QuickBuildBooking = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = useMemo(() => getQuickBuildBySlug(slug), [slug]);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (slug && !getQuickBuildBySlug(slug)) {
      navigate("/services", { replace: true });
    }
  }, [slug, navigate]);

  if (!slug || !service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 text-center text-muted-foreground text-sm">Loading…</div>
      </div>
    );
  }

  const onSubmit = async (data: BookingForm) => {
    setSubmitting(true);
    try {
      await createProject({
        slug: service.slug,
        submittedAt: Date.now(),
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company ?? "",
        notes: data.notes,
      });
      toast.success("Request saved. Track progress with your email.");
      const q = encodeURIComponent(data.email.trim());
      navigate(`/track?email=${q}`);
    } catch (e) {
      toast.error(submitErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-36 pb-20">
        <div className="section-container max-w-xl">
          <FadeIn>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to services
            </Link>

            <div className="flex items-start gap-4 mb-8">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "hsl(210 100% 60% / 0.12)" }}
              >
                <Zap className="w-6 h-6 text-[hsl(210_100%_60%)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary mb-1">Quick AI Build</p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">{service.name}</h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Estimated build window: {service.buildTimeMinutes} mins · After you submit, track status anytime with your
                  email on the{" "}
                  <Link to="/track" className="text-primary underline underline-offset-2">
                    track page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Avoid whileInView fade on the form: it can stay opacity 0 or delay interaction until scroll. */}
          <div className="mt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" className="rounded-xl" {...field} />
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
                        <Input type="email" placeholder="you@company.com" className="rounded-xl" {...field} />
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
                        <Input type="tel" placeholder="+91 …" className="rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" className="rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Goals, audience, brand notes, deadlines…"
                          className="rounded-xl min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full rounded-xl h-12 font-semibold" disabled={submitting}>
                  {submitting ? "Saving…" : "Submit & continue"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default QuickBuildBooking;
