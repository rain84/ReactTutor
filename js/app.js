/**
 * Created by Aleksandr_Gerasimov on 01-Nov-16.
 */

console.log(React);
console.log(ReactDOM);


let target = document.getElementById('root');


let News = React.createClass({
    render: () =>
        <div className="news">
            К сожалению, новостей нет.
        </div>
});

let Comments = React.createClass({
    render: () =>
        <div className="comments">
            Нет новостей - комментировать нечего
        </div>
});

let App = React.createClass({
    render: () =>
        <div className="app">
            Всем привет, я компонент App! Я умею отображать новости.
            <News/>
            <Comments/>
        </div>
});


//noinspection ES6ModulesDependencies
ReactDOM.render(
    <App/>,
    target
);
