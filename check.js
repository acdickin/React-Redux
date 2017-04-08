const { Component } = React
const { render } = ReactDOM
const { css, injectGlobal, default: styled } = styled
// const {
//   media: { min, max, xs, sm, md, lg, xl, xxl },
//   rem, em
// } = styleUtils

injectGlobal`
  body {
    margin: 0;
    padding: 60px;
    font-family: sans-serif;
  }
`

class Accordion extends Component {
  componentDidMount() {
    const titles = this.dl.querySelectorAll('dt')

    Array.from(titles).forEach(title => {
      const content = title.nextElementSibling

      title.addEventListener('click', () => {
        const opened = title.classList.toggle('is-opened')

        content.style.height = content.scrollHeight + 'px'

        if (opened) {
          const onTransitionEnd = () => {
            if (title.classList.contains('is-opened')) {
              content.style.height = 'auto'
            }
            content.removeEventListener('transitionend', onTransitionEnd)
          }
          content.addEventListener('transitionend', onTransitionEnd)
        } else {
          requestAnimationFrame(() => content.style.height = 0)
        }
      })
    })
  }

  render() {
    return (
      <dl ref={dl => this.dl = dl} className={this.props.className}>
        {this.props.children}
      </dl>
    )
  }
}

Accordion = styled(Accordion)`
  max-width: 700px;
  list-style: none;

  > dt,
  > dd > * {
    margin: 0;
    padding: 1em;
  }

  > dt {
    position: relative;
    z-index: 1;
    margin-top: -1px;
    font-weight: bold;
    background-color: white;
    border: 1px solid #ddd;
    transition: .3s;
    cursor: pointer;
  }

  > dd {
    height: 0;
    margin: 0;
    margin-top: -2px;
    line-height: 1.7;
    color: #666;
    border: 1px solid #ddd;
    opacity: 0;
    transition: .4s;
    overflow: hidden;
  }

  > dt.is-opened {
    background-color: #eee;
  }

  > dt.is-opened + dd {
    opacity: 1;
  }
`

const App = () => (
  <Accordion>
    <dt>Libero quis</dt>
    <dd>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure libero quis, tempora id, mollitia nam ex assumenda debitis laborum eum ducimus rerum adipisci earum fugiat placeat obcaecati dignissimos voluptatum harum!</p>
    </dd>
    <dt>Ducimus rerum</dt>
    <dd>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure libero quis, tempora id, mollitia nam ex assumenda debitis laborum eum ducimus rerum adipisci earum fugiat placeat obcaecati dignissimos voluptatum harum!</p>
    </dd>
    <dt>Libero quis</dt>
    <dd>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure libero quis, tempora id, mollitia nam ex assumenda debitis laborum eum ducimus rerum adipisci earum fugiat placeat obcaecati dignissimos voluptatum harum!</p>
    </dd>
  </Accordion>
)

render(<App />, document.getElementById('root'))
