import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from "../storageConfig";
import { fetchPlayersByGroup } from "./fetchPlayersByGroup";
import { AppError } from "@/utils/AppError";

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await fetchPlayersByGroup(group)

    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name)

    if(playerAlreadyExists.length > 0) {
      throw new AppError("Esse jogador já está registrado.")
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error;
  }
}