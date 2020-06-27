import React from 'react'

const SimilarHomesArrow = (props) => {
  console.log('arrows working')
  return (
    <div className="arrows">
      <div className="next control slider ">
        <button onClick={props.next} type="button" className="right sliderController">
          <div className="SVGContainer">
            <svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z" fill="#869099"></path>
            </svg>
          </div>
        </button>
      </div>
      <div className="previous control slider ">
        <button onClick={props.previous} type="button" className="left sliderController">
          <div className="SVGContainer">
          <svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M14.292 16.494l7.147 7.056-1.869 1.893-9.067-8.951 9.069-8.927 1.866 1.896z" fill="#869099"></path></svg>
          </div>
        </button>
      </div>
    </div>
  )
}
export default SimilarHomesArrow