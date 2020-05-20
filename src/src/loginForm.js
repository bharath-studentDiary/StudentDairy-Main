import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './Stores/UserStore';

class loginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userName:'',
      password:'',
      buttonDisable: false
    }

  }
  setInputValue(property,val){
    val = val.trim();
    if (val.lenght > 15) {
      return;
    } 
    this.setState({
      [property]: val
    })
  }
  resetForm() {
    this.setState({
      userName:'',
      password:'',
      buttonDisable: false

    })

  }
  async doLogin(){
    if(!this.state.userName){
    return;
  }
    if(!this.state.password){
    return;
    }
    this.setState({
      buttonDisable: true
    })
    try{
      let res= await fetch('/login',{
      method:'post',
      hearder:{
        'Accept': 'application/json',
        'Conent-Type':'application/json'
      },
      body: JSON.stringify({
        userName:this.state.userName,
        password:this.state.password
      })

    });

    let result =await res.json();
      if(result&& result.success){
        UserStore.isLoggedIn =true;
        UserStore.userName=result.userName;
      }
      else if (result&& result.success === false) 
      {
        this.resetForm();
        alert(result.msg);       
      }
    }
    catch(e){
      console.log(e);
      this.resetForm();
    }
  }
  
  render(){
  return (
    
    <div className="loginForm">
     Log In 
     <input
     type='text'
     placeholder= 'userName'
     value={this.state.userName ? this.state.userName:''}
    
     />
    </div>
  );
 }
}

export default loginForm;
