// src/components/PostList.tsx
export function PostList({
  items,
}: {
  items: { id: string; title: string; href: string }[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            className="text-base text-orange-200 hover:underline"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
