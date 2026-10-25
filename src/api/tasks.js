// JSONPlaceholder is a free test API: https://jsonplaceholder.typicode.com
const TASKS_URL = 'https://jsonplaceholder.typicode.com/todo?_limit=8';

export async function fetchTasks() {
  const response = await fetch(TASKS_URL);
  if (!response.ok) {
    throw new Error('Server replied with status ' + response.status);
  }
  const data = await response.json();
  // The API calls it "completed"; our app calls it "done"
  return data.map((item) => ({ id: item.id, title: item.title, done: item.completed }));
}
