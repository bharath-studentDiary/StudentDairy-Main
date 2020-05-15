import {extendObservable} from 'mobx';


class UserStore{
    constructor(){
        extendObservable(this,{

            loading:true,
            isLoadingIn: false,
            userName:''
        })
    }
}
export default new UserStore();