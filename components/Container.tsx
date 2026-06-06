// src/components/Container.tsx
export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-2xl px-6 py-12">{children}</div>;
}
