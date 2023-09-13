import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  formAction$,
  useForm,
  zodForm$,
  type InitialValues,
} from "@modular-forms/qwik";
import { z } from "zod";

export const HelloSchema = z.object({
  name: z.string().min(3),
});

type HelloForm = z.input<typeof HelloSchema>;

export const useFormLoader = routeLoader$<InitialValues<HelloForm>>(() => {
  return {
    name: "",
  };
});

export const useFormAction = formAction$<HelloForm>((values, { redirect }) => {
  console.log("VALUES", values);
  console.log("THIS IS SERVER ONLY CODE");

  throw redirect(302, "/success");
}, zodForm$(HelloSchema));

export default component$(() => {
  const [, { Form, Field }] = useForm<HelloForm>({
    loader: useFormLoader(),
    validate: zodForm$(HelloSchema),
    action: useFormAction(),
  });

  return (
    <main>
      <h1>Submit this form 😁</h1>
      <div>
        <Form>
          <Field name="name">
            {(field, props) => (
              <>
                <label for="name">What's your name</label>
                <input {...props} id="name" placeholder="John Doe" />
                {field.error && <small>{field.error}</small>}
              </>
            )}
          </Field>
          <button type="submit">Submit</button>
        </Form>
      </div>
    </main>
  );
});
