/**
 * Created by Aleksandr_Gerasimov on 01-Nov-16.
 */

console.log( React );
console.log( ReactDOM );


let my_news = [
  {
    author : 'Саша Печкин',
    text   : 'В четверг, четвертого числа...'
  },
  {
    author : 'Просто Вася',
    text   : 'Считаю, что $ должен стоить 35 рублей!'
  },
  {
    author : 'Гость',
    text   : 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
  }
];

let News = React.createClass( {
                                render : function () {
                                  let newsTemplate = this.props.data
                                    .map( ( item, index ) =>
                                            (
                                              <div key={index}>
                                                <p className="news__author">{item.author}:</p>
                                                <p className="news__text">{item.text}</p>
                                              </div>
                                            )
                                    );

                                  return (
                                    <div className="news">
                                      {newsTemplate}
                                    </div>
                                  );
                                }
                              } );

let Comments = React.createClass( {
                                    render : () =>
                                      <div className="comments">
                                        Нет новостей - комментировать нечего
                                      </div>
                                  } );

let App = React.createClass( {
                               render : () =>
                                 <div className="app">
                                   Всем привет, я компонент App! Я умею отображать новости.
                                   <News data={my_news}/> {/*comment*/}
                                   <Comments/>
                                 </div>
                             } );


let target = document.getElementById( 'root' );
//noinspection ES6ModulesDependencies
ReactDOM.render(
  <App/>,
  target
);
