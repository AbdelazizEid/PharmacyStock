import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ImageBackground } from 'react-native';
// import * as Animatable from 'react-native-animatable';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import background from './background.jpg';

class SignupForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChanged(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }
   
    renderError() {
        if (this.props.error) {
           return (
            <View style={{ backgroundColor: 'white' }}>
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
            </View>
           );
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                     Login
                     </Button>  
        );
    }


    render() {
        return (
            
                <ImageBackground source={background} style={styles.backgroundStyles}>
            <Card>
                
                <CardSection>
                    <Input
                    label="Email"
                    placeholder="email@gmail.com"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                    secureTextEntry
                    label="Passward"
                    placeholder="password"
                    onChangeText={this.onPasswordChanged.bind(this)}
                    value={this.props.password}
                    />
                </CardSection>

                {this.renderError()}

                <CardSection>
                  {this.renderButton()} 
                </CardSection>


            </Card>
            </ImageBackground>
            
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    backgroundStyles: {
        flex: 1,
        width: '100%',
        hight: '100%',
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return {
        email,
        password,
        error,
        loading
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(SignupForm);
