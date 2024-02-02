export const  generateAuthToken= (type) => {
    let res = ""

    if(type == "hardcode"){
        // Username : testerlecturer
        // Pass : tester123
        // Signed in at 26/1/24 17:49 WIB
        res = "2576|oVI8FnDGSDiCDvsVwjhUkh0EhQKr47LNXzGxmTV6"
    }

    return res
}

export const  generateUsername= (type) => {
    let res = ""

    if(type == "admin"){
        res = "testeradmin"
    } else if(type == "lecturer"){
        res = "testerlecturer"
    } 

    return res
}