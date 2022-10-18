import React, { useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { HighLightCard } from "../../components/HighLightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
export interface DatalistProps extends TransactionCardProps {
  id: string;
}

interface highLightsProps {
  amount: string;
}

interface highLightsData {
  entries: highLightsProps;
  expensive: highLightsProps;
  total: highLightsProps;
}
export function Dashboard() {
  const [isLoadding, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DatalistProps[]>([]);
  const [highLightsData, setHighLightsData] = useState<highLightsData>(
    {} as highLightsData
  );
  const dataKey = "@gofinance:transactions";
  const theme = useTheme();
  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expenseveTotal = 0;

    const transactionsFormated: DatalistProps[] = transactions.map(
      (item: DatalistProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expenseveTotal += Number(item.amount);
        }

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

    setTransactions(transactionsFormated);
    const total = entriesTotal - expenseveTotal;
    setHighLightsData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensive: {
        amount: expenseveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      {
        loadTransactions();
      }
    }, [])
  );

  return (
    <S.Container>
      {isLoadding ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
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
              amount={highLightsData.entries.amount}
              lastTransaction="Ultima Entrada dia 13 de Outubro"
              type="up"
            />
            <HighLightCard
              title="Saidas"
              amount={highLightsData.expensive.amount}
              lastTransaction="Ultima Entrada dia 13 de Outubro"
              type="down"
            />
            <HighLightCard
              title="Total"
              amount={highLightsData.total.amount}
              lastTransaction="Ultima Entrada dia 13 de Outubro"
              type="total"
            />
          </S.HighLightCards>

          <S.Transactions>
            <S.Title>Listagem</S.Title>
            <S.TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
}
