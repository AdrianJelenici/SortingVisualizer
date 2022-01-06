
export function getQuickSortAnimations(array) {

  const animations = [];

  if (array.length <= 1) {
    return array;
  }

  quickSort(array, 0, array.length - 1, animations);
  return animations;

}

function swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, start, end, animations) {

    var pivot = items[end];
    var i = start;

    for (let j = start; j < end; j++) {
        animations.push([1, j, end]); // comparing.
        animations.push([2, j, end]); // uncoloring
        if (items[j] < pivot) {
            swap(items, i, j);
            animations.push([3, i, j]); // swapping
            i++;
        }
    }

    swap(items, i, end);
    animations.push([3, i, end]); // swapping

    return i;
}

function quickSort(items, start, end, animations) {

    if (start < end) {
        let index = partition(items, start, end, animations);
        quickSort(items, start, index - 1, animations);
        quickSort(items, index + 1, end, animations);
    }
    
}