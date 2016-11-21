/**
 * Created by Aleksandr_Gerasimov on 01-Nov-16.
 */

(function ( global, undefined ) {

  let ee = new EventEmitter();

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

      return (
        <div className="article">
          <p className="news__author">{item.author}:</p>
          <p className="news__text">{item.text}</p>

          <a href="#"
             onClick={this.readMore}
             className={ [
               'news__big-text',
               state.visible && 'none'
             ].join( ' ' ) }
          >Подробнее</a>

          <p className={[
            'news__big-text',
            !state.visible && 'none'
          ].join( ' ' )
          }>{item.bigText}</p>
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
          <strong className={className}
          >News count {newsTemplate.length}</strong>
        </div>
      );
    }
  }

  class Add extends React.Component {
    constructor() {
      super();

      let onChange = ( type, e ) => {
        let val = e.target.value.trim();
        let field = ({
          input    : 'authorIsEmpty',
          textarea : 'textIsEmpty'
        })[type];

        this.setState( { [field] : val === '' } );
      };


      this.state = {
        agreeIsChecked : false,
        authorIsEmpty  : true,
        textIsEmpty    : true
      };

      this.input = {
        onChange : onChange.bind( this, 'input' )
      };

      this.textarea = {
        onChange : onChange.bind( this, 'textarea' )
      };

      this.checkbox = {
        onClick : ( e ) => this.setState( { agreeIsChecked : e.target.checked } )
      };

      this.button = {
        isDisabled : () => {

          return !this.state.agreeIsChecked ||
                 this.state.authorIsEmpty ||
                 this.state.textIsEmpty;
        },
        onClick    : ( e ) => {
          e.preventDefault();

          let item = {
            author  : this.refs.author.value,
            text    : this.refs.text.value,
            bigText : '...'
          };


          ee.emit( 'News.add', item );
        }
      };
    }

    componentDidMount() {
      this.refs.author.focus();
    }

    render() {
      let { agreeIsChecked, authorIsEmpty, textIsEmpty } = this.state;


      return (
        <form className="add cf">
          <input className="add__author"
                 defaultValue=""
                 placeholder="Введите значение"
                 ref="author"
                 onChange={this.input.onChange}
          />
          <textarea name="add" id="" cols="30" rows="10"
                    onChange={this.textarea.onChange}
                    className="add__text"
                    defaultValue=""
                    ref="text"
          ></textarea>
          <label htmlFor="agree" className="add_checkrule">Я согласен с правилами</label>
          <input type="checkbox" id="agree"
                 onClick={this.checkbox.onClick}
                 ref="checkrule"
                 defaultChecked={false}
          />
          <button
            className="add__btn"
            onClick={this.button.onClick}
            ref='alert_button'
            disabled={!agreeIsChecked ||
                      authorIsEmpty ||
                      textIsEmpty}
          >Добавить новость
          </button>
        </form>
      );
    }
  }

  class App extends React.Component {
    constructor() {
      super();

      this.state = {
        newsCounter : 0,
        news        : model.news
      };

      this.onNewsClick = () => {
        this.setState( { newsCounter : ++this.state.newsCounter } );
        console.log( 'this.state.newsCounter : %O', this.state.newsCounter );
      };
    }

    componentDidMount() {
      ee.addListener( 'News.add', item => this.setState( { news : this.state.news.concat( item ) } ) );
    }

    componentWillUnmount() {
      ee.removeListener( 'News.add' );
    }

    render() {
      return (
        <div className="app">
          <Add/>
          <h3 onClick={this.onNewsClick}>Новости ({this.state.newsCounter})</h3>
          <News data={this.state.news}/>
        </div>
      );
    }
  }


  //noinspection ES6ModulesDependencies
  ReactDOM.render(
    <App/>,
    document.getElementById( 'root' )
  );

})( this, undefined );
