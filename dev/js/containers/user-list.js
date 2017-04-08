import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectUser } from '../actions/index';

class UserList extends Component{

  createListItems(){
    return this.props.users.map((user)=>{
      return (
        <li
          key={user.id}
          onClick={() => this.props.selectUser(user)}
        >
          {user.first} {user.last}
        </li>
      );
    });
  }

  render(){
    return(
      <div className="menuList">
      <ul>
        {this.createListItems()}
      </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    users:state.users
  };
}

//passing the click function through redux instead of directly in createlistItems
function matchDispatchToProps(dispatch){
  return bindActionCreators({selectUser: selectUser}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(UserList);
