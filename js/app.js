/**
 * Created by Aleksandr_Gerasimov on 01-Nov-16.
 */

// console.log(React);
// console.log(ReactDOM);


var target = document.getElementById('root');
console.log('target : %O', target);

var h1 = ReactDOM.render(
    React.createElement('h1', null, 'Hello, World!'),
    target
);

setTimeout(function () {
    // console.log('h1 : %O', h1);
    h1.innerText = 'test';
}, 2000);


ReactDOM.render(
        React.createElement('h1', null, 'Spit my fire!'),
        target
    ) ;
