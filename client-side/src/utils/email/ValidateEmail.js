export const ValidateEmail = email => {

    let re = /\S+@\S+\.\S+/;

    if(email) {
        if(re.test(email) === false) {
            return true
        }
    } else {
        return false
    }
}