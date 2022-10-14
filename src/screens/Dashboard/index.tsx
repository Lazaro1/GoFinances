import React from "react";
import * as S from "./styles";
import { HighLightCard } from "../../components/HighLightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

export interface DatalistProps extends TransactionCardProps {
  id: string;
}
export function Dashboard() {
  const data: DatalistProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de Site",
      amount: "R$ 12,00,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "17/06/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Desenvolvimento de Site",
      amount: "R$ 12,00,00",
      category: { name: "Alimentação", icon: "coffee" },
      date: "17/06/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do Apartamento",
      amount: "R$ 12,00,00",
      category: { name: "Casa", icon: "shopping-bag" },
      date: "17/06/2020",
    },
  ];
  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/31623370?v=4",
              }}
            />
            <S.User>
              <S.UserGreeting>Olá</S.UserGreeting>
              <S.UserName>Lázaro</S.UserName>
            </S.User>
          </S.UserInfo>
          <S.LogoutButton onPress={() => {}}>
            <S.Icon name="power" />
          </S.LogoutButton>
        </S.UserWrapper>
      </S.Header>

      <S.HighLightCards>
        <HighLightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Ultima Entrada dia 13 de Outubro"
          type="up"
        />
        <HighLightCard
          title="Saidas"
          amount="R$ 1.259,00"
          lastTransaction="Ultima Entrada dia 13 de Outubro"
          type="down"
        />
        <HighLightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="Ultima Entrada dia 13 de Outubro"
          type="total"
        />
      </S.HighLightCards>

      <S.Transactions>
        <S.Title>Listagem</S.Title>
        <S.TransactionsList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </S.Transactions>
    </S.Container>
  );
}
