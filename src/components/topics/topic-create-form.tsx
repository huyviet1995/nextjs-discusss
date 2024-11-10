"use client";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useActionState } from "react";
import * as actions from "@/actions";
import FormButton from "../common/form-button";

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: { name: [], description: [] },
  });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState?.errors?.name?.length}
              errorMessage={formState?.errors?.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState?.errors?.description?.length}
              errorMessage={formState?.errors?.description?.join(", ")}
            />
            {formState.errors._form && (
              <div className='text-red-500'>
              {formState.errors._form.join(", ")}
              </div>
            )}
            <FormButton pending={isPending}>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
