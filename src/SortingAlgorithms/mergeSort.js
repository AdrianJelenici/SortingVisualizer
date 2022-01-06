
export function getMergeSortAnimations(array) {

  const animations = [];

  if (array.length <= 1) {
    return array;
  }

  const auxiliaryArray = array.slice(); // auxliaryArray == array
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
  
}
  
function mergeSortHelper (mainArray, startIdx, endIdx, auxiliaryArray, animations) {

  if (startIdx === endIdx) {
    return;
  }

  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  mergeSort(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
  
function mergeSort( mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {

  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {

    animations.push([1, i, j]); // comparing.
    animations.push([2, i, j]); // uncoloring
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([4, k, auxiliaryArray[i]]); // replacing
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([4, k, auxiliaryArray[j]]); // replacing
      mainArray[k++] = auxiliaryArray[j++];
    }

  }

  while (i <= middleIdx) {

    animations.push([1, i, i]); // comparing
    animations.push([2, i, i]); // uncoloring
    animations.push([4, k, auxiliaryArray[i]]); // replacing
    mainArray[k++] = auxiliaryArray[i++];

  }

  while (j <= endIdx) {

    animations.push([1, j, j]); // comparing
    animations.push([2, j, j]); // uncoloring
    animations.push([4, k, auxiliaryArray[j]]); // replacing
    mainArray[k++] = auxiliaryArray[j++];
    
  }

}