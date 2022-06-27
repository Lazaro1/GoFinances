import React from "react";
import * as S from "./styles";
import { HighLightCard } from "../../components/HighLightCard";

export function Dashboard() {
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
        <HighLightCard />
        <HighLightCard />
        <HighLightCard />
      </S.HighLightCards>
    </S.Container>
  );
}
