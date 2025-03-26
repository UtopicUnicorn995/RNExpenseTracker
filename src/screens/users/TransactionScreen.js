import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainContainer from '../../components/MainContainer';

export default function TransactionScreen() {
  return (
    <MainContainer hasScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Transaction History</Text>
        {/* <FlatList
          data={transactionData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TransactionCard
              transaction={item}
              onPress={() =>
                navigation.navigate('TransactionDetails', {transaction: item})
              }
            />
          )}
        /> */}
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
