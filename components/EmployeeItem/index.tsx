import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

interface EmployeeItemProps {
  employee: {
    id: string,
    title: string,
    firstName:string,
    createdAt: string,
  }
}

const EmployeeItem = ({ employee }: EmployeeItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('EmployeeScreen', { id: employee.id })
  }
  
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="file-outline" size={24} color="grey" />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.title}>{employee.firstName}</Text>
      </View>
    </Pressable>
  )
}

export default EmployeeItem
