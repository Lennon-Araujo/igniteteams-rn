import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { ButtonIcon } from "@/components/ButtonIcon";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { Button } from "@/components/Button";
import { ListEmpty } from "@/components/ListEmpty";
import { PlayerCard } from "@/components/PlayerCard";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { addPlayerByGroup } from "@/storage/player/addPlayerByGroup";
import { AppError } from "@/utils/AppError";
import { PlayerStorageDTO } from "@/storage/player/PlayerStorageDTO";
import { removePlayer } from "@/storage/player/removePlayer";
import { fetchPlayersByGroupAndTeam } from "@/storage/player/fetchPlayersByGroupAndTeam";

type RouteParams = {
  group: string;
}

export function Players(){
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  async function fetchPlayersByTeam() {
    try {
      const playersOnTeam = await fetchPlayersByGroupAndTeam(team, group)
      setPlayers(playersOnTeam)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddPlayer() {
    if(newPlayerName.trim() === '') {
      return Alert.alert('Novo jogador', 'Informe o nome do novo jogador')
    }

    const newPlayer = { name: newPlayerName.trim(), team: team.trim() }

    try {
      await addPlayerByGroup( newPlayer, group )
      await fetchPlayersByTeam()
      setNewPlayerName('')
      
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Novo jogador', error.message)
      } else {
        Alert.alert('Novo jogador', 'Não foi possível registrar o jogador')
        console.log(error);
        
      }
    }
  }

  async function handleRemovePlayer(player: PlayerStorageDTO){
    Alert.prompt('Remover Jogador', 'Você deseja remover o jogador?',)
    await removePlayer(player, group)
    await fetchPlayersByTeam()
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      
      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />
        <ButtonIcon onPress={handleAddPlayer} icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B","Time C"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players?.length}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Não há pessoas nesse time"
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button
        title="Remover Turma"
        type='SECONDARY'
        style={{marginTop: 6}}
      />

    </Container>
  )
}