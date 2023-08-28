import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Text, Alert } from "react-native"
import {styles} from "./styles"
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../styles/colors";
import { ComponentButtonInterface, ComponentLoading } from "../../components";
import { LoginTypes } from "../../navigations/login.navigation";
import { IRegister } from '../../services/data/User'
import { apiUser } from "../../services/data";
import { AxiosError } from "axios";
export interface IErrorApi {
    errors: {
        rule: string
        field: string
        message: string
    }[]
}
export function Cadastrar({navigation}:LoginTypes) {
    const [data, setData] = useState<IRegister>()
    const [ isLoading, setIsLoading ] = useState(true)
    async function handleRegister() {
        try {
            setIsLoading(true)
            if(data?.name && data.email && data.password){
                const response = await apiUser.register(data)
                Alert.alert(`${response.data.name}cadastrado(a)!!!`)
                navigation.navigate('Login')
            } else {
                Alert.alert("Preencha todos os campos!!!")
            }
        } catch (error) {
            const err = error as AxiosError
            const errData = err.response?.data as IErrorApi
            let message = ""
            if(errData) {
                for (const iterator of errData.errors){
                    message = `${message}${iterator.message} \n`
                }
            }
            Alert.alert(message)
        } finally {
            setIsLoading(false)
        }
    }
    function handleChange(item: IRegister) {
        setData({...data, ...item})
    }
    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },500)
    },[])
    return (
        <>
        {isLoading ? (
            <ComponentLoading/>
        ) : (
            <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={styles.title}>Cadastrar</Text>
                <View style={styles.formRow}>
                <MaterialIcons name="person" size={24} color="black" />
                <TextInput
                    placeholder="Nome"
                    placeholderTextColor={colors.black}
                    style={styles.input}
                    onChangeText={(i)=> handleChange({ name: i })}
                    />
                </View>
                <View style={styles.formRow}>
                <MaterialCommunityIcons name="email" size={24} color="black" />
                <TextInput
                    placeholder="E-mail"
                    placeholderTextColor={colors.black}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={(i)=> handleChange({ email: i })}
                    />
                </View>
                <View style={styles.formRow}>
                <Ionicons name="key" size={24} color="black" />
                <TextInput
                    placeholder="Senha"
                    placeholderTextColor={colors.black}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={(i)=> handleChange({ password: i })}
                    />
                </View>
                <ComponentButtonInterface title="Salvar" type="primary" onPressI={handleRegister}/>
                <ComponentButtonInterface title="Voltar" type="primary" onPressI={()=>navigation.navigate("Login")}/>
            </KeyboardAvoidingView>
        </View>
        )}
        </>
    );
}