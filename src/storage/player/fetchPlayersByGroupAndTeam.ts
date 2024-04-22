import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { fetchPlayersByGroup } from "./fetchPlayersByGroup";

export async function fetchPlayersByGroupAndTeam(team: string, group: string) {
  try {
    const storage = await fetchPlayersByGroup(group)
    const playersOnTeam = storage.filter(player => player.team === team) 
  
    return playersOnTeam;

  } catch (error) {
    throw error;
  }
}