import React from "react";
import * as S from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";

export function SigIn() {
  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <S.Title>Controle Suas{"\n"}financas de forma {"\n"}muito simples</S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>Faca o seu Loguin com  {"\n"} uma das contas abaixo</S.SignInTitle>
      </S.Header>

      <S.Footer>

      </S.Footer>
    </S.Container>
  );
}
