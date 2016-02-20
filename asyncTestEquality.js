/*
    This file tests asynchronously 2 params for equality.
    Can be used to validate your get APIs in the flux store.
*/
import _ from "lodash";
export default function asyncTestEquality(param1, param2, testName){
    setTimeout(function(){
        if(_.isEqual(param1, param2)){
            console.log('LOG:TEST:SUCCESS:', testName);
        }else{
            console.log('LOG:TEST:FAIL:', testName, param1, param2);
        }
    }, 0);
}
