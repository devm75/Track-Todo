import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';
import { Ionicons } from '@expo/vector-icons';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const priorityColor = colors.priority[todo.priority] || colors.priority.low;

  return (
    <View style={styles.container}>
      <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />
      
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onToggle(todo.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, todo.completed && styles.checkboxCompleted]}>
          {todo.completed && <Ionicons name="checkmark" size={16} color="#FFF" />}
        </View>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.todoText,
            todo.completed && styles.todoTextCompleted,
          ]}
        >
          {todo.text}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onEdit(todo)}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onDelete(todo.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden', // to keep priority indicator contained
  },
  priorityIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  checkboxContainer: {
    marginRight: spacing.md,
    marginLeft: 4, // Make room for priority indicator
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  todoText: {
    color: colors.text,
    fontSize: 16,
  },
  todoTextCompleted: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
});
