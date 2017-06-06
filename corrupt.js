var ascii = require('random-ascii');

module.exports = function corrupt(str) {
    var chance = .05;
    var callback = function (error, s) { };

    for (var i = 0; i < str.length; i++) {
        if (Math.random() < chance) {
            var rand = String.fromCharCode(Math.floor(Math.random() * 256))
            str = str.slice(0, i) + rand + str.slice(i+1)
            break
        }
    }
    
    return str;
}
