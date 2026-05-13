import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "~/utils/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
  bleed?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  className,
  bleed,
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn(
        bleed ? "px-gutter" : "container-fluid",
        className
      )}
      {...rest}
    />
  );
}
