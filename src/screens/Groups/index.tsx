import { Header } from '@/components/Header';
import { Container } from './styles';
import { Highlight } from '@/components/Highlight';
import { GroupCard } from '@/components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@/components/ListEmpty';

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera da Rocket'])

  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='jogue com a sua turma'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={(item) => (
          <GroupCard
            title={item.item}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
        <ListEmpty
          message='Que tal cadastrar a primeira turma?'
        />
      )}
      />
      
    </Container>
  );
}
