import React, { useState, useEffect } from 'react';
import { 
  StyleSheet,
   FlatList, 
   TextInput, 
   KeyboardAvoidingView,
   Platform,
   Alert,
   Pressable
} from 'react-native';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useRoute } from '@react-navigation/native';


import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';


const GET_EMPLOYEE = gql`
query myEmployee($id:ID!) {
  myEmployee (id:$id) {
    address
    firstName
    lastName
    age
    phoneNumber
  }
}
`
const CREATE_NEW_EMPLOYEE = gql`
mutation createEmployee($firstName:String!,$lastName:String!,$age:Int!,$address:String!,$phoneNumber:String!){
  createEmployee(firstName:$firstName,lastName:$lastName,age:$age,address:$address,phoneNumber:$phoneNumber){
      id
      firstName
      lastName
      age
      address
      phoneNumber
      
      
      users {
        id
        name
      }
      

  }
}
`


const UPDATE_EMPLOYEE= gql`
mutation updateEmployee($id:ID!,$firstName:String!,$lastName:String!,$age:Int!,$address:String!,$phoneNumber:String!){
  updateEmployee(id:$id,firstName:$firstName,lastName:$lastName,age:$age,address:$address,phoneNumber:$phoneNumber){
    firstName
    lastName
    age
    address
    phoneNumber

    users {
      email
      id
      name
    }

  }
}
`





const DELETE_EMPLOYEE = gql`
mutation deleteEmployee($id: ID!){
  deleteEmployee(id: $id)
  
  
  }
`



let id = '4'

export default  function  EmployeeScreen() {
  const navigation = useNavigation();

        // best practice is to useReducer , but the time is very tight to refactor it


  const [project, setProject] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [deletedEmployee, setDeletedEmployee] = useState(false);







  const route = useRoute();
  const id = route.params.id;
  const addEmployee= route.params.addEmployee;
  

 
    const {
      data, error, loading
    } = useQuery(GET_EMPLOYEE, { variables: { id }});

    
    
  useEffect(() => {



    if (error) {
      console.log(error);
      Alert.alert('Error fetching project', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      // best practice is to useReducer , but the time is very tight to refactor it
      setProject(data.myEmployee);
      setFirstName(data.myEmployee.firstName);
      setLastName(data.myEmployee.lastName);
      setAddress(data.myEmployee.address);
      setAge(data.myEmployee.age);
      setPhoneNumber(data.myEmployee.phoneNumber);

    }
  }, [data]);
  



  const [
    updateEmployee, { data: updateEmployeeData, error: updateEmployeeError }
  ] = useMutation(UPDATE_EMPLOYEE);


  
  useEffect(()=>{
    if(updateEmployeeData){
      Alert.alert("Updated !","Employee updated successfully",
      [
        { text: 'Go back Home', onPress: () => navigation.push('Home')
      },
    ],
    { cancelable: false }
      )
    
    }
    }
    
  ,[updateEmployeeData])



  const [deleteEmployee, { data: deletedEmployeeData, error: DeletedEmployeeError }] =  useMutation(DELETE_EMPLOYEE,{ variables: { id }});
   console.log(" delete employee data ============= > ",deletedEmployeeData);



useEffect(()=>{
  if(deletedEmployeeData){
    Alert.alert("Deleted !","item deleted successfully",
    [
      { text: 'Go back Home', onPress: () => navigation.push('Home',{deleted:true})
    },
  ],
  { cancelable: false }
    )
  
  }
  }
  
,[deletedEmployeeData])

  const handleDelete= ()=>{
    deleteEmployee();

  }


  const handleUpdate= ()=>{
    updateEmployee(
  
      {variables: {
       id,firstName,lastName,age,address,phoneNumber
      }}

    );

  }

 

  if (!project) {
    return null;
  }

  return (
    <KeyboardAvoidingView       
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 130 : 0}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder={'First Name'}
          style={styles.title} 
        />
          <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder={'Last Name'}
          style={styles.title} 
        />
           <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder={'Address'}
          style={styles.title} 
        />
      
          <TextInput
        style={styles.title}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Phone Number"
        keyboardType="numeric"
      />

<TextInput
        style={styles.title}
        onChangeText={(value)=>setAge(Math.floor(parseInt(value)))}
        value={age.toString()}
        placeholder="Age"
        keyboardType="numeric"
      />

       <>
       <Pressable style={
         styles.update
          } onPress={handleUpdate}>
      <Text>{addEmployee ? "Add Employee": "Update Employee"} </Text>
    </Pressable>{
      !addEmployee ?  <Pressable style={
        {...styles.update,
        bottom:70}
        } onPress={ handleDelete}>
      <Text>{"Delete Employee !"} </Text>
    </Pressable>:""
    }
       </>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    width: '100%',
  },
  title: {
    width: '100%',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 12,
    borderWidth:2,
    borderColor:"black",
    padding:10, 
    borderRadius:10
    
  },
  update:{alignItems:"center", justifyContent:"center",width:"90%", height:40,
  borderColor:"black", borderWidth:2,borderRadius:20, margin:20,
   position:"absolute",bottom:10}
});
