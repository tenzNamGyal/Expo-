// Works out how many tasks are done, for the stats bar.
export function calculateStats(tasks) {
  const total = tasks.length;
  const done = tasks.filter((task) => task.done).length;
  const percent = total === 0? 0: Math.round((done / total) * 100);
  return { total, done, percent };
}
