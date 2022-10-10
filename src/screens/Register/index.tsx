import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/Input";
import { InputForm } from "../../components/Forms/inputForm";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";
import { useForm } from "react-hook-form";

import { CategorySelect } from "../CategorySelect";
import * as S from "./style";

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  interface FormData {
    name: string;
    amount: number;
  }

  const { control, handleSubmit } = useForm();

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryMopdal() {
    setCategoryModalOpen(true);
  }

  function handleRegister(form: FormData) {
    console.log(form);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>
        <S.Form>
          <S.Fields>
            <InputForm
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
            />
            <InputForm
              placeholder="Preço"
              name="amount"
              control={control}
              keyboardType="numeric"
            />
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

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryMopdal}
            />
          </S.Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </S.Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
