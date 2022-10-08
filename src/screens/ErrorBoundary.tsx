import React from 'react';
import {StyleSheet, View, SafeAreaView, Text, Button} from 'react-native';

type State = {
  isCoughtError: boolean;
};
type Props = {
  children: React.ReactNode;
};

export class ErrorBoundary extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isCoughtError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({isCoughtError: true});
  }

  onRestartPress = () => {
    this.setState({isCoughtError: false});
  };

  render(): React.ReactNode {
    if (this.state.isCoughtError) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text>Oh! Got some error</Text>
            <Text>Can you please restart</Text>
            <Button title="Restart" onPress={this.onRestartPress} />
          </View>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
