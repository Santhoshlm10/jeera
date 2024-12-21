/* eslint-disable prefer-const */

export type StringOrNumber = string | number

const BASE_URL = 'http://localhost:3001/table'
export const UPLOAD_FILE_URL = "http://localhost:3001/upload"

class SQLinkAPIsClass {

    /**
     * @param tableName takes tablename for your database
     * @param queryParameters include select, filter or top parameters in query parameters
     * @example getDataFromSQL('Todos','$select=task_id,task_name,task_description&$filter=task_status eq 'completed')
     * 
     */
    async getDataFromSQL(tableName:string,queryParameters:string){
        let q = await fetch(`${BASE_URL}/${tableName}/read?${queryParameters}`,{
            headers:{
                Authorization: ""
            }
        })
        let q_res = await q.json()
        return q_res
    }

    async updateDataToSQL(tableName:string,payloadData:Record<any,any>,updateKey:StringOrNumber,updateValue:StringOrNumber){
        let q = await fetch(`${BASE_URL}/${tableName}/update(${updateKey},${updateValue})`,{
            method:'PUT',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(payloadData)
        })
        let q_res = await q.json()
        return q_res
    }


    async insertDataToSQL(tableName:string,payloadData:Record<any,any>){
        let q = await fetch(`${BASE_URL}/${tableName}/create`,{
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(payloadData)
        })
        let q_res = await q.json()
        return q_res
    }

    async deleteDataToSQL(tableName:string,deleteKey:StringOrNumber,deleteValue:StringOrNumber){
        let q = await fetch(`${BASE_URL}/${tableName}/delete(${deleteKey},${deleteValue})`,{
            method:'DELETE',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({})
        })
        let q_res = await q.json()
        return q_res
    }

}
let QueryAPI = new SQLinkAPIsClass();
export default QueryAPI;