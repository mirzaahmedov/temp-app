import { cn } from "@/lib/utils";

export const LoadingSpinner = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div className={cn("relative", className)} {...rest}>
      <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-[hsl(var(--background))]"></div>
      <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
    </div>
  );
};
