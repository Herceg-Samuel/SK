// src/components/Section.tsx
export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-300 mb-4">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
