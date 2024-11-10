"use server";
import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import Profile from "@/components/profile";

export default async function Home() {
  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
      <Profile />
    </div>
  );
}
