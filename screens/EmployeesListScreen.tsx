import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Alert, Pressable } from 'react-native';
import EmployeeItem from "../components/EmployeeItem";
import { Text, View } from '../components/Themed';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';



const MY_EMPLOYES = gql`
query myEmployeeList {
  myEmployeeList {
    id
    firstName
    lastName
    age
  }
}
`

export default function EmployeesListScreen() {

  
  const [employees, setEmployees] = useState([]);

  const { data, error, loading } = useQuery(MY_EMPLOYES)


  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching Employees', error.message);
    }
  }, [error]);




  useEffect(() => {
    if (data) {
      setEmployees(data.myEmployeeList);
      console.log("===================>",data.myEmployeeList)
    }
  }, [data]);


  const navigation = useNavigation();

  const addEmployee =()=>{ 

      navigation.navigate('EmployeeScreen', { addEmployee:true})
    

   }
  const route = useRoute();
  

  return (
    <View style={styles.container}>
     {!employees ? <FlatList
        data={employees}
        renderItem={({item}) => <EmployeeItem employee={item} />}
        style={{ width: '100%' }}
      />:<Pressable style={
      styles.add
      } onPress={ addEmployee}>
      <Text>There is no Employees, Create one ? </Text>
    </Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  root: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#404040',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    marginRight: 5,
  },
  time: {
    color: 'darkgrey'
  },
  add:{alignItems:"center", 
  justifyContent:"center",
  width:"90%",
   height:40,
  borderColor:"black",
   borderWidth:2,
   borderRadius:20,
    margin:20
  }
});
