import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import api from '../../service/index';
import { AuthContext } from '../../context/index';

const CompleteTasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const { userToken, setLoading, loading } = useContext(AuthContext);

  useEffect(() => {
    loadTasks();
  }, [])

  const loadTasks = async () => {
    if (userToken) {
      try {
        const response = await api.get('tasks?status=true', {
          headers: {
            Authorization: `${userToken}`,
          },
        });

        const tasksData = response.data;
        setTasks(tasksData);
      } catch (error) {
        setTasks([]);
      }
    }
    setLoading(false);
  };

  const toggleSelectTask = (id) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const deleteTasks = async (taskId) => {
    Alert.alert('Confirmar', 'Deseja realmente excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            await api.delete(
              `tasks/${taskId}`,
              { headers: { Authorization: `${userToken}` } }
            )

            Toast.show({
              type: 'success',
              text1: 'Tarefas excluídas com sucesso!',
              visibilityTime: 2500,
            })

            loadTasks();
          } catch (error) {
            Toast.show({
              type: 'error',
              text1: 'Erro',
              text2: 'Não foi possível excluir a tarefa!',
              visibilityTime: 3000,
            })
            console.error(error);
          }
          setLoading(false);
        },
      },
    ])
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedTasks.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.taskCard, isSelected && styles.taskCardSelected]}
        onPress={() => toggleSelectTask(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <View style={styles.taskActions}>
            <TouchableOpacity onPress={() => deleteTasks(item.id)} style={styles.iconButton}>
              <Ionicons name='trash' size={20} color='#FF3B30' />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.taskDescription}>{item.description}</Text>

        <View style={styles.taskFooter}>
          <Text style={styles.taskDate}>
            Criado em: {new Date(item.createdAt).toLocaleDateString('pt-BR')}
          </Text>
          <Text
            style={[
              styles.status,
              { color: item.completed ? '#4CAF50' : '#FF9800' },
            ]}
          >
            {item.completed ? 'Concluído' : 'Pendente'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color='#7B2FF7' style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
      ) : (
        <>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  listContent: {
    paddingBottom: 80,
  },
  taskCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  taskCardSelected: {
    borderColor: '#7B2FF7',
    backgroundColor: '#EFE5FF',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  taskDescription: {
    color: '#666',
    marginTop: 6,
    fontSize: 14,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
  },
  status: {
    fontWeight: '600',
  },
  iconButton: {
    marginLeft: 12,
  },
})

export default CompleteTasksScreen;