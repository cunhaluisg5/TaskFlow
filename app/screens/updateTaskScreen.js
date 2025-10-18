import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import api from '../../service/index';
import { AuthContext } from '../../context/index';

const UpdateTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { userToken, setLoading, loading } = useContext(AuthContext);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (id) {
      loadTask();
    }
  }, [id]);

  const loadTask = async () => {
    if (userToken) {
      try {
        const response = await api.get(`tasks/${id}`, {
          headers: {
            Authorization: `${userToken}`,
          },
        });
        const tasksData = response.data;
        setTitle(tasksData.title);
        setDescription(tasksData.description);
      } catch (error) {
        console.log('Erro ao buscar tarefa.')
      }
    }
    setLoading(false);
  };

  const updateTask = async () => {
    if (!title.trim() || !description.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Preencha todos os campos!',
        text2: 'Título e descrição são obrigatórios.'
      });
      return;
    }

    try {
      setLoading(true);

      await api.put(`tasks/${id}`, {
        title, description
      },
      {
        headers: {
          Authorization: `${userToken}`,
        },
      });

      Toast.show({
        type: 'success',
        text1: 'Tarefa atualizada com sucesso!',
      });

      setTitle('');
      setDescription('');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar a tarefa',
        text2: 'Tente novamente mais tarde.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name='document-text-outline' size={20} color='#6b7280' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder='Título'
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name='create-outline' size={20} color='#6b7280' style={styles.icon} />
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder='Descrição'
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={updateTask}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size='large' color='#7B2FF7' style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
        ) : (
          <>
            <Ionicons name='save-outline' size={20} color='#fff' />
            <Text style={styles.buttonText}>Atualizar Tarefa</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 15,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#7B2FF7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },
});

export default UpdateTaskScreen;