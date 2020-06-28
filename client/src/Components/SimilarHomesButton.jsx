import React from 'react'
import styles from '../Styles/HomesButton.css'

class SimilarHomesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      red: {
        color: '#F00',
        opacity: 1
      },
      white: {
        color: '#000',
        opacity: 0.4
      }
    }
    this.handleClick = this.handleClick.bind(this)
  }

  // handle click
  handleClick() {
    console.log('clicked heart')
    this.setState(state => ({
      saved: !state.saved
    }));
  }
  render() {
    return (
      <div className={styles.saveHomeButton}>
        <div role="button" onClick={this.handleClick} className={styles.heartButton}>
          <svg width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none">
            <path d="M26.95 11.863a5.193 5.193 0 0 1-1.53 3.69l-1.913 1.912-7.373 7.373-7.371-7.373-1.912-1.912a5.214 5.214 0 1 1 7.377-7.366l1.906 1.907 1.908-1.908a5.214 5.214 0 0 1 8.908 3.677z" fillOpacity={this.state.saved ? this.state.red.opacity : this.state.white.opacity}fill={this.state.saved ? this.state.red.color: this.state.white.color}></path>
            <path d="M26.95 11.863a5.214 5.214 0 0 0-8.908-3.677l-1.908 1.908-1.906-1.908a5.214 5.214 0 1 0-7.377 7.366l1.912 1.913 7.371 7.373 7.373-7.373 1.912-1.912a5.193 5.193 0 0 0 1.53-3.69zM16.157 6.31A7.874 7.874 0 1 1 27.3 17.433l-1.913 1.913-9.254 9.254-1.88-1.88-7.373-7.374-1.91-1.91a7.874 7.874 0 1 1 11.137-11.13l.027.025.022-.022z" fill="#FFF">
            </path>
          </g>
          </svg>
        </div>
      </div>
    )
  }
}

export default SimilarHomesButton