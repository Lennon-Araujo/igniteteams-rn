import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";

import { AppError } from "@/utils/AppError";
import { groupCreate } from "@/storage/group/groupCreate";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [groupName, setGroupName] = useState('')

  const navigation = useNavigation()

  async function handleNewGroup() {
    const newGroup = groupName.trim()

    if(newGroup === '') {
      return Alert.alert('Nova Turma', 'Informe o nome da turma.')
    }

    try {
      await groupCreate(groupName)
      navigation.navigate('players', { group: groupName })
      
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Nova Turma', error.message)
      } else {
        console.log(error);
        Alert.alert('Nova Turma', "Não foi possível criar uma nova turma.")
      }
    }
  }
  
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Nome da turma"
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  )
}