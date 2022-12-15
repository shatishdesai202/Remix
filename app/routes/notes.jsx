import { json, redirect } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import NewNotes, { links as NewNotesLinks } from "~/component/NewNotes";
import NoteList, { links as NoteLinks } from "~/component/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

const Notes = () => {
  const notes = useLoaderData();

  return (
    <div>
      <NewNotes />
      <NoteList notes={notes} />
    </div>
  );
};

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes?.length === 0) {
    throw json(
      { message: "List is Empty" },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }
  return notes;
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long." };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  // await new Promise((res, rej) => setTimeout(() => res(), 5000));
  return redirect("/notes");
};

export const links = () => {
  return [...NewNotesLinks(), ...NoteLinks()];
};

export function CatchBoundary() {
  const caughtResponse = useCatch();
  console.log("caughtResponsecaughtResponse", caughtResponse);
  const message = caughtResponse.data?.message || "Data not found.";
  console.log("message", message);
  return (
    <main>
      <NewNotes />
      <p className="info-message">{message}</p>
    </main>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <main className="error">
      <h1>An error related to your notes occurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}

export default Notes;
