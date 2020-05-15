import React from 'react';
import {observer} from 'mobx-react';
import UserStore from './Stores/UserStore';
import login from './login';
import InputField from './InputField';
import SubmitButton from'./SubmitButton';
import './App.css';

class App extends React.Component{

  async componentDidMount(){

    try{
      let res=await fetch('/isLoggedIn',{
        method:'post',
        hearder:{
          'Accept': 'application/json',
          'Conent-type':'application/json'
        }

      });
      let result =await res.json();
      if(result&& result.success){
        UserStore.loading =false;
        UserStore.isLoadingIn=true;
        UserStore.userName=result.userName;
      }
      else{
        UserStore.loading =false;
        UserStore.isLoadingIn =false;

      }

    }
    catch(e){
      UserStore.loading = false;
      UserStore.isLoadingIn = false;

    }
  }
  async doLogout(){

    try{
      let res=await fetch('/logout',{
        method:'post',
        hearder:{
          'Accept': 'application/json',
          'Conent-type':'application/json'
        }

      });
      let result =await res.json();
      if(result&& result.success){
        UserStore.isLoggedIn =false;
        UserStore.userName='';
      }
      

    }
    catch(e){
      console.log(e)

    }
  }
  render(){
    if (UserStore.loading){
      return(
        <div className="app">
        <div className='container'>
          loading, please wait..
        </div>
       </div>
      );
    }
    else{

    if (UserStore.isLoggedIn){
      return(
        <div className="app">
        <div className='container'>
          Welcome {UserStore.userNmae}
          <submitButton
          text={'Log Out'}
          disabled={false}
          onClick={ ()=> this.doLogout() }
          />
        </div>
       </div>
      );
    }
  return (
    
    <div className="app">
      <div className='container'>
        <login/>
        </div>    
    </div>
  );
}
  }
}

export default observer (App);
