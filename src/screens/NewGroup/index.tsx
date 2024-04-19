import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [groupName, setGroupName] = useState('')

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('players', { group: 'Rocket' })
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