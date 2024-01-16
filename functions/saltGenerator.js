// This is not an industry
// standard best practice salt generator, I made this for
// shits and giggles, but it should still improve security

const alphabetMap = new Map([
  ['A', ['X', 'Y', 'Z', 'M', 'N']],
  ['B', ['P', 'Q', 'R', 'S', 'T']],
  ['C', ['U', 'V', 'W', 'X', 'Y']],
  ['D', ['A', 'B', 'C', 'D', 'E']],
  ['E', ['F', 'G', 'H', 'I', 'J']],
  ['F', ['K', 'L', 'M', 'N', 'O']],
  ['G', ['P', 'Q', 'R', 'S', 'T']],
  ['H', ['U', 'V', 'W', 'X', 'Y']],
  ['I', ['A', 'B', 'C', 'D', 'E']],
  ['J', ['F', 'G', 'H', 'I', 'J']],
  ['K', ['K', 'L', 'M', 'N', 'O']],
  ['L', ['P', 'Q', 'R', 'S', 'T']],
  ['M', ['U', 'V', 'W', 'X', 'Y']],
  ['N', ['A', 'B', 'C', 'D', 'E']],
  ['O', ['F', 'G', 'H', 'I', 'J']],
  ['P', ['K', 'L', 'M', 'N', 'O']],
  ['Q', ['P', 'Q', 'R', 'S', 'T']],
  ['R', ['U', 'V', 'W', 'X', 'Y']],
  ['S', ['A', 'B', 'C', 'D', 'E']],
  ['T', ['F', 'G', 'H', 'I', 'J']],
  ['U', ['K', 'L', 'M', 'N', 'O']],
  ['V', ['P', 'Q', 'R', 'S', 'T']],
  ['W', ['U', 'V', 'W', 'X', 'Y']],
  ['X', ['A', 'B', 'C', 'D', 'E']],
  ['Y', ['F', 'G', 'H', 'I', 'J']],
  ['Z', ['K', 'L', 'M', 'N', 'O']],
])

export const  _getRandomInt = function(max){
    return Math.floor(Math.random() * max);
}

export const  generateSalt = function (username,email){
    let salt = "";
    for(let i = 0; i < 50; i ++){
        let letterArray = alphabetMap.get( username[_getRandomInt(username.length)].toUpperCase)();
        let randomLetter = letterArray[letterArray.length];
    }
    
    salt += username[_getRandomInt(username.length)];
    salt += username[_getRandomInt(username.length)];
    salt += username[_getRandomInt(username.length)];

    salt += email[_getRandomInt(email.length)];
    salt += email[_getRandomInt(email.length)];
    salt += email[_getRandomInt(email.length)];

    return salt
}
