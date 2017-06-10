module.exports = function corrupt(str) {
    var chance = .001;
    var callback = function (error, s) { };

    if (str.length != undefined) {
        for (var i = 0; i < str.length; i++) {
            if (Math.random() < chance) {
                str = str.slice(0, i) + " " + str.slice(i+1)
            }
        }
    }

    return str;
}
