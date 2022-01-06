import { Component } from "react";
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/quickSort.js';
import "./SortingVisualizer.css";
import { getBubbleSortAnimations} from "../SortingAlgorithms/bubbleSort.js";
import { getSelectionSortAnimations} from "../SortingAlgorithms/selectionSort.js";
import { getInsertionSortAnimations} from "../SortingAlgorithms/insertionSort.js";


class SortingVisualizer extends Component {

  constructor(props) {
      super(props);
      this.state = {
          array: [],
          speed: 10,
      };
  }

  componentDidMount() {
    this.resetArray();
    document.getElementById("stop-button").setAttribute('disabled', 'disabled');
    document.getElementById("changeSize").value = "90";
  }
  
  resetArray() {

    const array = [];
    for (let i = 0; i < 260; i++) {
      array.push(randomIntFromInterval(75, 750));
    }
    this.setState({array});

    document.getElementById("merge-sort").removeAttribute('disabled');
    document.getElementById("quick-sort").removeAttribute('disabled');
    document.getElementById("bubble-sort").removeAttribute('disabled');
    document.getElementById("selection-sort").removeAttribute('disabled');
    document.getElementById("insertion-sort").removeAttribute('disabled');
    document.getElementById("changeSize").removeAttribute('disabled');
    document.getElementById("sorting-speed").removeAttribute('disabled');
  }

  sort(string) {

    document.getElementById("stop-button").removeAttribute('disabled');
    document.getElementById("merge-sort").setAttribute('disabled', 'disabled');
    document.getElementById("quick-sort").setAttribute('disabled', 'disabled');
    document.getElementById("bubble-sort").setAttribute('disabled', 'disabled');
    document.getElementById("selection-sort").setAttribute('disabled', 'disabled');
    document.getElementById("insertion-sort").setAttribute('disabled', 'disabled');
    document.getElementById("generate-button").setAttribute('disabled', 'disabled');
    document.getElementById("changeSize").setAttribute('disabled', 'disabled');
    document.getElementById("sorting-speed").setAttribute('disabled', 'disabled');

    let step = 0;

    if (string == "mergeSort") {
      let animations = getMergeSortAnimations(this.state.array);
      step = this.performAnimations(animations);
    } else if (string == "quickSort") {
      let animations = getQuickSortAnimations(this.state.array);
      step = this.performAnimations(animations);
    } else if (string == "bubbleSort") {
      let animations = getBubbleSortAnimations(this.state.array);
      step = this.performAnimations(animations);
    } else if (string == "selectionSort") {
      let animations = getSelectionSortAnimations(this.state.array);
      step = this.performAnimations(animations);
    } else if (string == "insertionSort") {
      let animations = getInsertionSortAnimations(this.state.array);
      step = this.performAnimations(animations);
    }
    
    setTimeout(() => {
      document.getElementById("merge-sort").removeAttribute('disabled');
      document.getElementById("quick-sort").removeAttribute('disabled');
      document.getElementById("bubble-sort").removeAttribute('disabled');
      document.getElementById("selection-sort").removeAttribute('disabled');
      document.getElementById("insertion-sort").removeAttribute('disabled');
      document.getElementById("generate-button").removeAttribute('disabled');
      document.getElementById("changeSize").removeAttribute('disabled');
      document.getElementById("sorting-speed").removeAttribute('disabled');
      document.getElementById("stop-button").setAttribute('disabled', 'disabled');
    }, (step+2)* this.state.speed);
  
  }

  performAnimations(animations) {

    let step = 0;

    for (let i = 0; i < animations.length; i++) {

      const arrayBars = document.getElementsByClassName('array-bar');
      const [type, barOneIdx, barTwoIdx] = animations[i];
      
      if (type == 1) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = 'red';
          barTwoStyle.backgroundColor = 'red';
        }, i * this.state.speed);
      }

      else if (type == 2) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = 'goldenrod';
          barTwoStyle.backgroundColor = 'goldenrod';
        }, i * this.state.speed);
      }

      else if (type == 3) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          const barOneHeight = barOneStyle.height;
          const barTwoHeight = barTwoStyle.height;
          barOneStyle.height = barTwoHeight;
          barTwoStyle.height = barOneHeight;
        }, i * this.state.speed);
      }

      else if (type == 4) {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${barTwoIdx}px`;
        }, i * this.state.speed);
      }

      step++;
      
    }

    return step;

  }

  stopSort() {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      const bar = arrayBars[i].style;
      bar.backgroundColor = 'goldenrod';
    }

    document.getElementById("generate-button").removeAttribute('disabled');
    document.getElementById("stop-button").setAttribute('disabled', 'disabled');
  }

  resetSpeed() {
    this.setState({speed: 10});
    document.getElementById("changeSize").value = "90";
  }

  handleChange = evt => {
    var value = 100 - evt.target.value;
    this.setState( () => (
      {speed: value})
    );
  }
  
  render() {

      const{array} = this.state;

      return (

          <div className = "array-container">

              {array.map( (value, index) => (
                  <div 
                  className = "array-bar" 
                  key = {index} 
                  style = { {height: `${value}px`}}>
                  </div>
              ))}

              <button 
              className = "generate-button"
              id="generate-button"
              onClick = {() => this.resetArray()}>
              Generate New Array
              </button>

              <button 
              className = "stop-button"
              id="stop-button"
              onClick = {() => this.stopSort()}>
              Stop Sort
              </button>
              
              <input
                id="changeSize"
                type="range"
                name = "changeSize"
                min="49"
                max="99"
                step="10"
                onChange={this.handleChange}
              />

              <button 
              className = "sorting-speed"
              id="sorting-speed"
              onClick = {() => this.resetSpeed()}>
              Change Sorting Speed:
              </button>
           
              <button 
              className = "merge-sort"
              id="merge-sort"
              onClick = {() => this.sort("mergeSort")}>
              Merge Sort
              </button>

              <button 
              className = "quick-sort"
              id="quick-sort"
              onClick = {() => this.sort("quickSort")}>
              Quick Sort
              </button>

              <button 
              className = "bubble-sort"
              id="bubble-sort"
              onClick = {() => this.sort("bubbleSort")}>
              Bubble Sort
              </button>

              <button 
              className = "selection-sort"
              id="selection-sort"
              onClick = {() => this.sort("selectionSort")}>
              Selection Sort
              </button>

              <button 
              className = "insertion-sort"
              id="insertion-sort"
              onClick = {() => this.sort("insertionSort")}>
              Insertion Sort
              </button>

          </div>
      );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;