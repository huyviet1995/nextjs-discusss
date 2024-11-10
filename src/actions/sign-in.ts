import * as auth from "@/auth";
export async function signIn() {
  'use server';
  return auth.signIn('github');
}