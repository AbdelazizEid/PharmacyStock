import Communication from 'react-native-communications';
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
  state= { showModal: false };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, quantity } = this.props;
    this.props.employeeSave({ name, phone, quantity, uid: this.props.employee.uid });
  }


  onTextPress() {
    const { phone, quantity } = this.props;

    Communication.text(phone, `we need medicine ${quantity}`);
  }

  onAccept() {
    const { uid } = this.props.employee;

    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }


  render() {
    return (
      <Card>
        <EmployeeForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
              Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Delete
          </Button>
        </CardSection>


        <Confirm 
         visible={this.state.showModal}
         onAccept={this.onAccept.bind(this)}
         onDecline={this.onDecline.bind(this)}
        >
          Are you sure ?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, quantity } = state.employeeForm;
  return { name, phone, quantity };
};

export default connect(mapStateToProps, { 
  employeeUpdate, employeeSave, employeeDelete 
})(EmployeeEdit);
