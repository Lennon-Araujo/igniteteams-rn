import { Container, Content, Icon } from "./styles";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";
import { useState } from "react";

export function NewGroup() {
  const [groupName, setGroupName] = useState('')

  function handleNewGroup() {
    console.log(groupName);
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