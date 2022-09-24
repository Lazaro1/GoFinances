import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";
import * as S from "./style";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }
  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>
      <S.Form>
        <S.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <S.TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type="down"
              title="OutCome"
              onPress={() => handleTransactionTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </S.TransactionsTypes>

          <CategorySelect title="Categoria" />
        </S.Fields>
        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  );
}
