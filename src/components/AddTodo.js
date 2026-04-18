import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';
import { Ionicons } from '@expo/vector-icons';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('low'); // 'low', 'medium', 'high'

  const handleAdd = () => {
    if (text.trim() === '') return;
    onAdd(text.trim(), priority);
    setText('');
    setPriority('low');
    Keyboard.dismiss();
  };

  const PriorityButton = ({ level, label, color }) => (
    <TouchableOpacity
      style={[
        styles.priorityButton,
        priority === level && { backgroundColor: color, borderColor: color },
      ]}
      onPress={() => setPriority(level)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.priorityText,
          priority === level && { color: '#FFF', fontWeight: 'bold' },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          placeholderTextColor={colors.textSecondary}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.addButton, !text.trim() && styles.addButtonDisabled]}
          onPress={handleAdd}
          disabled={!text.trim()}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.priorityRow}>
        <Text style={styles.priorityLabel}>Priority:</Text>
        <View style={styles.priorities}>
          <PriorityButton level="low" label="Low" color={colors.priority.low} />
          <PriorityButton level="medium" label="Medium" color={colors.priority.medium} />
          <PriorityButton level="high" label="High" color={colors.priority.high} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginRight: spacing.sm,
  },
  priorities: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    marginHorizontal: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  priorityText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
