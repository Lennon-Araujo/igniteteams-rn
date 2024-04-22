import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from "../storageConfig";
import { fetchPlayersByGroup } from "./fetchPlayersByGroup";

export async function removePlayer(player: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await fetchPlayersByGroup(group)

    const newStorage = storedPlayers.filter(p => p.name !== player.name)

    const storage = JSON.stringify([...newStorage])
    
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error;
  }
}