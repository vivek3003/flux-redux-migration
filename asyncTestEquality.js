import _ from "lodash";
export default function asyncTestEquality(param1, param2, testName){
    if(_.isEqual(param1, param2)){
        console.log('LOG:TEST:SUCCESS:', testName);
    }else{
        console.log('LOG:TEST:FAIL:', testName, param1, param2);
    }
}