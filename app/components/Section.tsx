import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "~/utils/cn";

type Props = ComponentPropsWithoutRef<"section"> & {
  flush?: boolean;
};

export const Section = forwardRef<HTMLElement, Props>(function Section(
  { className, flush, ...rest },
  ref
) {
  return (
    <section
      ref={ref}
      className={cn("relative", flush ? "" : "py-section", className)}
      {...rest}
    />
  );
});
