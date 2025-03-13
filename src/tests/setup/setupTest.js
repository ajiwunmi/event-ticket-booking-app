import  dotenv from "dotenv";
import {connect_db}   from "../../database/index.js";
dotenv.config();
import users from "../data/users.js";



const setupTest = async () => {
    beforeAll(async () => {

        try{
             const db = await connect_db();
             console.log(users)
        }catch(error){
            console.log(error);
;        }
       
       
    });
    // afterAll(() => {
    //     console.log('Teardown test');
    // });
    // beforeEach(() => {
    //     console.log('Before each test');
    // }); 
}
 setupTest()
