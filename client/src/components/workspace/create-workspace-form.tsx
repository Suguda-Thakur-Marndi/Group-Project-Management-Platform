import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspaceMutationFn } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Loader, Building2, ArrowRight } from "lucide-react";

export default function CreateWorkspaceForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkspaceMutationFn,
  });

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Workspace name is required",
    }),
    description: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;
    mutate(values, {
      onSuccess: (data) => {
        queryClient.resetQueries({ queryKey: ["userWorkspaces"] });
        const workspace = data.workspace;
        onClose();
        navigate(`/workspace/${workspace._id}`);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="w-full flex flex-row min-h-[520px] h-auto max-w-full">
      {/* Form */}
      <div className="h-full px-8 py-8 flex-1">
        {/* Header */}
        <div className="mb-6 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shrink-0 mt-0.5">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">
              Create a Workspace
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
              Organize your team, projects, and tasks all in one place.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Workspace Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Workspace Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Acme Corp, Design Team"
                      className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-slate-400">
                    Your company, team, or organization name.
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Description
                    <span className="text-xs font-normal text-slate-400 ml-2">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Describe what this workspace is for..."
                      className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500 text-sm resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-slate-400">
                    Help team members understand the purpose of this workspace.
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all duration-300 text-sm"
              type="submit"
            >
              {isPending ? (
                <Loader className="animate-spin mr-2 h-4 w-4" />
              ) : (
                <ArrowRight className="mr-2 h-4 w-4" />
              )}
              Create Workspace
            </Button>
          </form>
        </Form>
      </div>

      {/* Side image / decoration */}
      <div
        className="relative flex-1 shrink-0 hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

        <div className="relative z-10 text-center px-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/40">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Your hub for teamwork</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Projects, tasks, members, and analytics—all organized under one workspace.
          </p>
        </div>
      </div>
    </main>
  );
}
