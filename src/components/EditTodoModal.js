import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

export default function EditTodoModal({ visible, todo, onSave, onCancel }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('low');

  useEffect(() => {
    if (todo) {
      setText(todo.text);
      setPriority(todo.priority || 'low');
    }
  }, [todo]);

  const handleSave = () => {
    if (text.trim() === '') return;
    onSave({ ...todo, text: text.trim(), priority });
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
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView 
        style={styles.centeredView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Edit Task</Text>
          
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Task description"
            placeholderTextColor={colors.textSecondary}
            autoFocus
          />

          <View style={styles.priorityRow}>
            <Text style={styles.priorityLabel}>Priority:</Text>
            <View style={styles.priorities}>
              <PriorityButton level="low" label="Low" color={colors.priority.low} />
              <PriorityButton level="medium" label="Medium" color={colors.priority.medium} />
              <PriorityButton level="high" label="High" color={colors.priority.high} />
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton, !text.trim() && styles.disabledButton]} 
              onPress={handleSave}
              disabled={!text.trim()}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    width: '90%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.background,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  priorityRow: {
    marginBottom: spacing.xl,
  },
  priorityLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  priorities: {
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
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.md,
  },
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    marginLeft: spacing.sm,
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: colors.border,
    opacity: 0.7,
  },
});
