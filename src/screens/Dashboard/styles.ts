import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";

import { DatalistProps } from "./index";
import {
  BorderlessButton,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled(GestureHandlerRootView)`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;
export const User = styled.View`
  margin-left: 17px;
`;
export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled<any>(Feather)`
  color: ${({ theme }) => theme.colors.attention_light};
  font-size: ${RFValue(24)}px;
`;

export const HighLightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 16px;
`;

export const TransactionsList = styled(
  FlatList as new (
    props: FlatListProps<DatalistProps>
  ) => FlatList<DatalistProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(), // não deu certo
  },
})``;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
