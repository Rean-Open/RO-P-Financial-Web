//CHECK FOR VALID PHONE FORMAT
export function validateUserName(userName) {
    return /^[0-9A-Za-z_.-]+$/.test(userName) && userName.length > 3 && userName.length < 20
}