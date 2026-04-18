import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, StatusBar, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing } from './src/theme';

import Header from './src/components/Header';
import AddTodo from './src/components/AddTodo';
import TodoItem from './src/components/TodoItem';
import EditTodoModal from './src/components/EditTodoModal';

const STORAGE_KEY = '@track_todos';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (e) {
      console.error('Failed to load todos', e);
    }
  };

  const saveTodos = async (todosToSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todosToSave));
    } catch (e) {
      console.error('Failed to save todos', e);
    }
  };

  const handleAddTodo = (text, priority) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    // Sort logic could go here, or just prepend
    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null);
  };

  const sortedTodos = [...todos].sort((a, b) => {
    // Sort by completion status first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by priority (high > medium > low)
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    if (priorityWeight[a.priority] !== priorityWeight[b.priority]) {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    // Finally by creation date
    return b.createdAt - a.createdAt;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      <Header />
      
      <AddTodo onAdd={handleAddTodo} />

      {todos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
        </View>
      ) : (
        <FlatList
          data={sortedTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <EditTodoModal
        visible={editingTodo !== null}
        todo={editingTodo}
        onSave={handleSaveEdit}
        onCancel={() => setEditingTodo(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
});
