import Colors from "../utility/Colors";
import { View, Text, FlatList } from "react-native-reanimated/lib/typescript/Animated";

export default Transactions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={({item}) => <TransactionItem transaction={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
