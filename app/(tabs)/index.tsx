import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";

const App: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>("6");
  const [interestRate, setInterestRate] = useState<string>("3");
  const [loanLength, setLoanLength] = useState<string>("5");
  const [downPayment, setDownPayment] = useState<string>("2");
  const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseInt(loanLength) * 12;
    if (
      isNaN(principal) ||
      isNaN(monthlyInterestRate) ||
      isNaN(numberOfPayments)
    ) {
      Alert.alert(
        "invalid input",
        "Please make sure all inputs are valid numbers."
      );
      return;
    }
    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Loan Payment Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Loan Amount"
        keyboardType="numeric"
        value={loanAmount}
        onChangeText={setLoanAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Interest Rate (%)"
        keyboardType="numeric"
        value={interestRate}
        onChangeText={setInterestRate}
      />
      <TextInput
        style={styles.input}
        placeholder="Loan Length (years)"
        keyboardType="numeric"
        value={loanLength}
        onChangeText={setLoanLength}
      />
      <TextInput
        style={styles.input}
        placeholder="Down Payment"
        keyboardType="numeric"
        value={downPayment}
        onChangeText={setDownPayment}
      />
      <Button
        title="Calculate monthly payment"
        onPress={calculateMonthlyPayment}
      />
      {monthlyPayment !== null && (
        <Text style={styles.result}>Monthly Loan Amount ${monthlyPayment}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 24,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default App;
