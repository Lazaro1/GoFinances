import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import * as S from "./style";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormated: string;
  color: string;
  percent: string;
}
export interface TransactionCardData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    setIsLoading(true);

    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormated = response ? JSON.parse(response) : [];

    const expensives = responseFormated.filter(
      (expensive: TransactionCardData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensives.reduce(
      (acumulator: number, expensive: TransactionCardData) => {
        return acumulator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionCardData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "brl",
        });

        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;
        totalByCategory.push({
          key: category.key,
          name: category.name,
          totalFormated: total,
          color: category.color,
          total: categorySum,
          percent: percent,
        });
      }
      setIsLoading(false);
    });

    setTotalByCategories(totalByCategory);
  }

  useFocusEffect(
    useCallback(() => {
      {
        loadData();
      }
    }, [selectedDate])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por Categoria</S.Title>
      </S.Header>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <S.Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <S.MonthSelect>
            <S.MonthSelectButton onPress={() => handleDateChange("prev")}>
              <S.MonthSelectIcon name="chevron-left" />
            </S.MonthSelectButton>

            <S.Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </S.Month>

            <S.MonthSelectButton onPress={() => handleDateChange("next")}>
              <S.MonthSelectIcon name="chevron-right" />
            </S.MonthSelectButton>
          </S.MonthSelect>

          <S.ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x="percent"
              y="total"
              colorScale={totalByCategories.map((item) => item.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={90}
            />
          </S.ChartContainer>

          {totalByCategories.map((item) => (
            <HistoryCard
              title={item.name}
              amount={item.totalFormated}
              color={item.color}
              key={item.key}
            />
          ))}
        </S.Content>
      )}
    </S.Container>
  );
}
