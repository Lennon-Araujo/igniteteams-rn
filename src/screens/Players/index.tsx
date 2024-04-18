import { Header } from "@/components/Header";
import { Container } from "./styles";
import { Highlight } from "@/components/Highlight";
import { ButtonIcon } from "@/components/ButtonIcon";
import { Input } from "@/components/Input";

export function Players(){
  return (
    <Container>
      <Header showBackButton />
      
      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />

      <Input
        placeholder="Nome da pessoa"
        autoCorrect={false}
      />
      <ButtonIcon icon="add" />
    </Container>
  )
}