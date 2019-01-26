import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { Card , CardSection,  Button } from './common';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import EmployeeForm from './EmployeeForm';


class EmployeeCreate extends Component {
    onButtonPress() {
        const { name, phone, quantity} = this.props;

        this.props.employeeCreate({ name, phone, quantity : quantity|| '0'});
    }
  render() {
      return (
       <Card>
           <EmployeeForm {...this.props} />

           <CardSection>
               <Button onPress={this.onButtonPress.bind(this)}>
                   Create
               </Button>
           </CardSection>

       </Card>
      );
    }
}


const mapStateToProps = (state) => {
    const { name, phone, quantity } = state.employeeForm;

    return { name, phone, quantity }
};

export default connect (mapStateToProps, {employeeUpdate, 
    employeeCreate})
     (EmployeeCreate);