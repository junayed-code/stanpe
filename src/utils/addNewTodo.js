"use server";

/**
 *
 * @param {FormData} formData
 */
const addNewTodo = formData => {
  const title = formData.get("title");
  const description = formData.get("description");
  console.log({ title, description });
};

export default addNewTodo;
