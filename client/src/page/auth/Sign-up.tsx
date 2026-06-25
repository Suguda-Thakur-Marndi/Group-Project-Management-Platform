import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import GoogleOauthButton from "@/components/auth/google-oauth-button";
import { useMutation } from "@tanstack/react-query";
import { registerMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });
  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    }),
    email: z.string().trim().email("Invalid email address").min(1, {
      message: "Workspace name is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;
    mutate(values, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative overflow-hidden bg-slate-900 dark:bg-slate-950">
      {/* Immersive ambient background animations */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-ambient-glow-reverse" />

      <div className="flex w-full max-w-md flex-col gap-6 relative z-10">
        <Link
          to="/"
          className="flex items-center gap-3 self-center font-extrabold text-3xl tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          <Logo />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">GPMS</span>
        </Link>
        <div className="flex flex-col gap-6">
          <Card className="glass-card border-white/20 dark:border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Create an account</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Signup with your Email or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-6">
                    <div className="flex flex-col gap-4 hover-lift">
                      <GoogleOauthButton label="Signup" />
                    </div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-slate-200 dark:after:border-slate-800">
                      <span className="relative z-10 bg-white dark:bg-slate-900 px-2 text-slate-500 text-xs font-medium">
                        Or continue with
                      </span>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  className="!h-[48px] bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all rounded-xl"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="m@example.com"
                                  className="!h-[48px] bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all rounded-xl"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                Password
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  className="!h-[48px] bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all rounded-xl"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 rounded-xl hover-lift"
                      >
                        {isPending && <Loader className="animate-spin mr-2 h-5 w-5" />}
                        Sign up
                      </Button>
                    </div>
                    <div className="text-center text-sm text-slate-600 dark:text-slate-400 font-medium">
                      Already have an account?{" "}
                      <Link to="/" className="font-semibold text-indigo-600 dark:text-indigo-400 underline underline-offset-4 hover:text-indigo-500">
                        Sign in
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-slate-400 dark:text-slate-500 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-white transition-colors">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
