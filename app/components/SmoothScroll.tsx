import { ClientOnly } from "./ClientOnly";
import { LenisProvider } from "./LenisProvider";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientOnly>{() => <LenisProvider />}</ClientOnly>
      {children}
    </>
  );
}
