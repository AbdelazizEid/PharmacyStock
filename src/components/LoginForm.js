import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import LoopAnimation from 'react-native-LoopAnimation';
import { emailChanged, passwordChanged, loginUser, forgetPassword } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import background from './background.jpg';


class LoginForm extends Component {
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

    onTouchPress(){
        const { email } = this.props
        this.props.forgetPassword ({ email });
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

        <View style={styles.backgroundStyles}>
            <View style={ styles.loopStyle }>
                <LoopAnimation source={require('./med1.jpg')} duration={50000} />
            </View>       
               
                
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

                <CardSection>
                  < Button onPress={this.onTouchPress.bind(this)}>
                     Forget Passward 
                      
                    </Button>  
                </CardSection>    
                

            </Card>
            </View>
            
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
        
    },

    loopStyle: {
        opacity: 1
    },

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

export default connect(mapStateToProps, { 
     emailChanged,
     passwordChanged, 
     loginUser,
     forgetPassword 
    })(LoginForm);
