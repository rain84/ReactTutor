/**
 * Created by Aleksandr_Gerasimov on 01-Nov-16.
 */

let model = {};

model.news = [
  {
    author  : 'Саша Печкин',
    text    : 'В четчерг, четвертого числа...',
    bigText : 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author  : 'Просто Вася',
    text    : 'Считаю, что $ должен стоить 35 рублей!',
    bigText : 'А евро 42!'
  },
  {
    author  : 'Гость',
    text    : 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText : 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];


// model.news.length = 0;


class Article extends React.Component {
  constructor() {
    super();

    this.state = { visible : false };

    this.readMore = ( e ) => {
      e.preventDefault();
      this.setState( { visible : true } );
    };
  }

  static get propTypes() {
    return {
      item : React.PropTypes.shape( {
                                      author  : React.PropTypes.string.isRequired,
                                      text    : React.PropTypes.string.isRequired,
                                      bigText : React.PropTypes.string.isRequired
                                    } )
    };
  }

  render() {
    let item = this.props.item;
    let state = this.state;

    let className = {
      readMore : [
        'news__readMore',
        state.visible && 'none'
      ].join( ' ' ),

      bigText : [
        'news__big-text',
        !state.visible && 'none'
      ].join( ' ' )
    };

    return (
      <div className="article">
        <p className="news__author">{item.author}:</p>
        <p className="news__text">{item.text}</p>

        <a href="#"
           onClick={this.readMore}
           className={
             'news__readMore' +
             (state.visible && ' none_')
           }
        >Подробнее</a>

        <p className={className.bigText}>{item.bigText}</p>
      </div>
    );
  }
}

class News extends React.Component {
  constructor( ...args ) {
    super( ...args );
  }

  static get propTypes() {
    return {
      data : React.PropTypes.array.isRequired
    };
  }

  render() {
    let data = this.props.data;
    let haveNews = data && data.length;
    let className = !data.length && 'none' || '';
    let newsTemplate = '';

    if ( haveNews ) {
      newsTemplate = data.map( ( item, index ) => (
        <Article item={item} key={index}/>
      ) );
    }

    else {
      newsTemplate = <p>К сожалению, новостей нет</p>;
    }

    return (
      <div className="news">
        {newsTemplate}
        <strong className={className}>News count {newsTemplate.length}</strong>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h3>Новости</h3>
        <News data={model.news}/>
      </div>
    );
  }
}


//noinspection ES6ModulesDependencies
ReactDOM.render(
  <App/>,
  document.getElementById( 'root' )
);
