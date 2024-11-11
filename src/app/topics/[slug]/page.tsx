import PostCreateForm from "@/components/posts/post-create-form";
interface TopicShowPageProps {
  params: {
    slug: string;
    name: string;
  }
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug, name } = await params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">
          {name}
        </h1>
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  )
};

