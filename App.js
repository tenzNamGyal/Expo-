import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { fetchTasks } from './src/api/tasks';
import { filterTasks } from './src/utils/filter';
import StatsBar from './src/components/StatsBar';
import AddTaskForm from './src/components/AddTaskForm';
import FilterBar from './src/components/FilterBar';
import TaskItem from './src/components/TaskItem';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState(null);

  // Load the starting tasks from the server once, when the app opens
  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => setError(err.message));
  }, []);

  function addTask() {
    const title = newTitle.trim();
    if (!title) return;
    setTasks([{ id: Date.now(), title, done: false }, ...tasks]);
    setNewTitle('');
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }

  const visibleTasks = filterTasks(tasks, filter);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>CST Tasks</Text>
      <StatsBar tasks={tasks} onClearDone={clearDone} />
      <AddTaskForm value={newTitle} onChangeText={setNewTitle} onAdd={addTask} />
      {/* <FilterBar current={filter} onChange={setFilter} /> */}
      {error && <Text style={styles.error}>Could not load tasks: {error}</Text>}
      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F6FA', paddingTop: 56 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1F2A44', marginHorizontal: 16 },
  error: { color: '#C62828', marginHorizontal: 16, marginBottom: 8 },
});
