import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../storageConfig";
import { groupFetch } from "./groupFetch";

export async function groupRemove(groupForRemove: string) {
  try {
    const storedGroups = await groupFetch()

    const storageUpdated = storedGroups.filter(group => group !== groupForRemove)

    const storage = JSON.stringify(storageUpdated)

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupForRemove}`)
  } catch (error) {
    throw error;
  }
}