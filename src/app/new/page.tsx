import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/db';

async function createTodo(data: FormData) {
  'use server';
  const title = data.get('title')?.valueOf();
  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('Invalid Title');
  }

  await prisma.todo.create({
    data: {
      title,
      complete: false,
    },
  });
  redirect('/');
}

export default function NewPage() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New todo</h1>
      </header>
      <form action={createTodo} className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          className="border border-slate-400 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link href=".." className="button-slate">
            Cancel
          </Link>
          <button type="submit" className="button-slate">
            Add todo
          </button>
        </div>
      </form>
    </>
  );
}
