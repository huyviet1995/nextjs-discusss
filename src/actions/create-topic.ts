"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message:
        "Name must be lowercase and contain only letters and hyphens",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a topic"],
      },
    }
  }

  const result = createTopicSchema.safeParse({
    name: formData.get("name") ?? "",
    description: formData.get("description") ?? "",
  });
  if (result.success === false) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let topic: Topic;
  try {
    const slug = result.data.name.toLowerCase().split(' ').join('-').replace(/-+$/, '');
    topic = await db.topic.create({
      data: {
        slug,
        name: result.data.name,
        description: result.data.description,
      }
    })
  } catch (error) {
    if (error instanceof Error)
      return {
        errors: {
          _form: [error.message],
        },
      };
    else {
      return {
        errors: {
          _form: ["An error occurred"],
        },
      };

    }
  }
  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug));
  return { errors: {} };
}
