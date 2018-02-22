// Yaroslav Gaponov (yaroslav.gaponov@gmail.com)

function buildNumber(i) {
    switch (i) {
        case 0:     return '+[]';
        case 1:     return '+!![]';
        default:    return buildNumber(i>>1) + buildNumber(i-(i>>1));
    }
}

function _buildSymbol(code, c) {
    const s = eval(code);
    const indx = s.indexOf(c);
    if (indx !== -1) {
        return '((' + code + ')[' + buildNumber(indx) +'])';
    }
    return;
}

function buildSymbol(c) {    
    return  _buildSymbol('!![]+[]', c) || 
            _buildSymbol('![]+[]', c) || 
            _buildSymbol('[][' + buildNumber(0)+ ']+[]', c) ||
            _buildSymbol('[]+{}', c) ||            
            _buildSymbol('(+[])[' + string('constructor') + ']+[]', c) ||
            _buildSymbol('([]+[])[' + string('constructor') + ']+[]', c) ||
            _buildSymbol('([]+[])[' + string('constructor') + ']+[]', c) ||
            _buildSymbol('+[]['+ string('constructor')+']((' + buildNumber(1) + ')+(' +  buildSymbol('e') +  ')+(' + buildNumber(5) + ')+(' + buildNumber(0) + ')+(' + buildNumber(0) + '))+[]', c) ||
            (c >= 'a' && c <= 'z' && _buildSymbol('('+buildNumber(10 + c.charCodeAt(0) - 'a'.charCodeAt(0))+')[' + string('toString') + '](' +  buildNumber(36) + ')', c)) ||
            '`' + c + '`'
    ;
}

function string(s) {
    const code = [];
    for(let i=0; i<s.length; i++) {
        code.push(buildSymbol(s[i]));
    }
    return code.join('+');
}

function func(s) {
    return new Function(`[][${string('filter')}][${string('constructor')}](${string(s)})()`);
}

module.exports = func;



