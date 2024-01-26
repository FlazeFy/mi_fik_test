export const  generateAuthToken= (type) => {
    let res = ""

    if(type == "hardcode"){
        // Username : testerlecturer
        // Pass : tester123
        // Signed in at 26/1/24 17:49 WIB
        res = "2571|GQzUwoXKgA2pjZ4EGWddVIn0k98exAhRG3hFjCH5"
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