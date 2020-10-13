function sortDate (files) {
    const todoArray = files.map(file =>  file.split('\n'))
    let result = []
    let year = /\d\d\d\d.*;/im;
    let dayAndMonth = /\d/gim;
    let regEx = /\/\/ TODO.*$/gim;
        for (let item of todoArray){
            for (let str of item){
                if (str.match(regEx)){
                    result.push(str
                        .slice(str.indexOf('//')))
                }
            }
        }
    let important = []
    let other = []
    for (let item of result){
        if (item.match(year)) important.push(item)
        else other.push(item)
    }
    important.sort(function(a, b){
        a = a.match(dayAndMonth).join('')
        b = b.match(dayAndMonth).join('')
        return b - a
    })
    result = important.concat(other)
    let res=[];
    let name=' ';
    let date=' ';
    let comment=' ';
    let imp = ' ';
    let maxWidthName=10;
    let maxWidthComment=50;
    for(let i=0;i<result.length;i++){
        result[i].match(/ *!$/gim) ? imp = '!' : imp = ' '
        let tableResult=result[i].replace('//'+' TODO','').split(';');
        if(tableResult.length<2){
            comment=String(tableResult).replace(/\!/gim, '');
            res.push(`  ${imp}  | ${" ".repeat(10)}   | ${" ".repeat(10)}   | ${comment}`)
        }
        else{
        for(let j=0;j<tableResult.length;j++){
                if(tableResult[0]===undefined){name=''}else{name=tableResult[0];}
                if(tableResult[1]===undefined){date=''}else{date=tableResult[1];}
                if(tableResult[2]===undefined){comment=''}else{comment=String(tableResult[2]).replace(/\!/gim, '');}
                
                if(tableResult[0].length>maxWidthName){
                    maxWidthName=tableResult[0].length;
                }
                if(tableResult[2].length>maxWidthComment){
                    maxWidthComment=tableResult[2].length;
                }
                
                var resultName = ''
                name.length > 10 ? resultName = name.slice(0, 7) + '...'
                                 : resultName = name + " ".repeat(10-name.length)
                
                var resultComment = ''
                comment.length > 50 ? resultComment = comment.slice(0, 47) + '...'
                                    : resultComment = comment
        }
        res.push(`  ${imp}  | ${resultName}   | ${date}  | ${resultComment}`);
    }
}
    
console.log('  !  | user         |  date        | comment    ');
console.log('-'.repeat(74));
for(let el=0; el < res.length; el++){
    console.log(res[el]);
}
console.log('-'.repeat(74));//1+11+11+51
}

module.exports = {
    sortDate
};