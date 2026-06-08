import { Section } from "@/components/Section";
import { PostList } from "@/components/PostList";

const Essays = () => {
  return (
    <>
      <Section title="Essays">
        <PostList
          items={[
            { id: "1", title: "Why I am Building This", href: "/#" },
            { id: "2", title: "On Systems Thinking", href: "/#" },
          ]}
        />
      </Section>
    </>
  );
};

export default Essays;
