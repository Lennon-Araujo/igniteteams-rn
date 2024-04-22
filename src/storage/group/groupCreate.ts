import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "../storageConfig";
import { groupFetch } from "./groupFetch";
import { AppError } from "@/utils/AppError";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupFetch()

    const groupAlreadyExists = storedGroups.includes(newGroup)

    if(groupAlreadyExists) {
      throw new AppError("Essa turma já existe")
    }

    const storage = JSON.stringify([...storedGroups,newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error;
  }
}