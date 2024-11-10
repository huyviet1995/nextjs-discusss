
import * as auth from '@/auth';

export async function signOut() {
  'use server';
  return auth.signOut();
}
