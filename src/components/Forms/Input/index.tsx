import React from "react";
import { TextInputProps } from "react-native";
import * as S from "./style";

type Props = TextInputProps;

export function Input({...rest}: Props) {
  return <S.Container {...rest} />
}
