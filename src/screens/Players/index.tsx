import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

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
import { groupRemove } from "@/storage/group/groupRemove";
import { Loading } from "@/components/Loading";

type RouteParams = {
  group: string;
}

export function Players(){
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation();
  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function fetchPlayersByTeam() {
    setIsLoading(true)
    try {
      const playersOnTeam = await fetchPlayersByGroupAndTeam(team, group)
      setPlayers(playersOnTeam)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
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
    try {
      await removePlayer(player, group)
      await fetchPlayersByTeam()
    } catch (error) {
      console.log(error);
      Alert.alert('Remover jogador', 'Não foi possível remover o jogador.')
    }
  }

  async function onRemoveGroup() {
    try {
      await groupRemove(group)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error);
      Alert.alert('Remover Turma', 'Não foi possível remover a turma.')
    }
  }

  function handleRemoveGroup() {
    Alert.alert(
      'Remover Turma',
      'Tem certeza que deseja remover a turma?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Confirmar', onPress: () => onRemoveGroup()}
      ]
    )
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
          inputRef={newPlayerNameInputRef}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
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
      {
        isLoading
        ? <Loading />
        : (
          <FlatList
            data={players}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PlayerCard
                name={item.name}
                onRemove={() => (
                  Alert.alert(
                    'Remover Jogador',
                    'Você deseja remover o jogador?',
                    [
                      {text: 'Cancelar'},
                      {text: 'Confirmar', onPress: () => handleRemovePlayer(item)}
                    ]
                  )
                )}
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
        )
      }


      <Button
        title="Remover Turma"
        type='SECONDARY'
        style={{marginTop: 6}}
        onPress={handleRemoveGroup}
      />

    </Container>
  )
}