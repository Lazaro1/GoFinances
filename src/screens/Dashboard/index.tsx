import React, { useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { HighLightCard } from "../../components/HighLightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export interface DatalistProps extends TransactionCardProps {
  id: string;
}
export function Dashboard() {
  const [data, setData] = useState<DatalistProps[]>([]);
  const dataKey = "@gofinance:transactions";

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormated: DatalistProps[] = transactions.map(
      (item: DatalistProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const data = new Date(item?.date);
        const daterFormated = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(data);

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date: daterFormated,
        };
      }
    );

    setData(transactionsFormated);
  }

  // useEffect(() => {
  //   loadTransactions();

  //   AsyncStorage.removeItem(dataKey);
  // }, []);

  useFocusEffect(
    useCallback(() => {
      {
        loadTransactions();
      }
    }, [])
  );

  useEffect(() => {
    async function clean() {
      await AsyncStorage.removeItem(dataKey);
    }

    async function getITem() {
      const response = await AsyncStorage.getItem(dataKey);

      console.log(response, "_______responde");
    }

    // clean();

    // getITem();
  }, []);

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
