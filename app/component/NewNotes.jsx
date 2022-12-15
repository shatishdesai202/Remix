import { Form, useActionData, useTransition } from "@remix-run/react";
import newNotesStyle from "./newNotes.css";

function NewNote() {
  const transition = useTransition();
  const actionData = useActionData();
  console.log({ actionData });
  const isSubmitting = transition.state === "submitting";

  return (
    <Form method="post" id="note-form">
      {actionData?.message && <p>{actionData?.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "adding ...." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: "stylesheet", href: newNotesStyle }];
}
