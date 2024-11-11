'use server'
import PostCreateForm from "@/components/posts/post-create-form";
import { db } from '@/db';

interface TopicShowPageProps {
  params: {
    slug: string;
  }
}

export default async function TopicShowPage({ params }: TopicShowPageProps ) {
  const { slug } = await params;
  const name = await fetchNameBySlug(slug);
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

// Define the fetchNameBySlug function
async function fetchNameBySlug(slug: string): Promise<string> {
  const topic = await db.topic.findFirst({
    where: { slug }
  })
  if (!topic) {
    throw 'Cannot find slug'
  }
  return topic.name;
}

