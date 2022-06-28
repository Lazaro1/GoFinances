import React from "react";
import * as S from "./styles";
import { HighLightCard } from "../../components/HighLightCard";
import { TransactionCard } from "../../components/TransactionCard";
import { getBottomSpace } from "react-native-iphone-x-helper";

export function Dashboard() {
  const data = [
    {
      title: "Desenvolvimento de Site",
      amount: "R$ 12,00,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "17/06/2020",
    },
    {
      title: "Desenvolvimento de Site",
      amount: "R$ 12,00,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "17/06/2020",
    },
    {
      title: "Desenvolvimento de Site",
      amount: "R$ 12,00,00",
      category: { name: "Vendas", icon: "dollar-sign" },
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
          <S.Icon name="power" />
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
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace(), // não deu certo
          }}
        />
      </S.Transactions>
    </S.Container>
  );
}
