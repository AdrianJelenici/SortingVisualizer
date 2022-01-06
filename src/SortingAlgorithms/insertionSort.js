export function getInsertionSortAnimations(array) {

    const animations = [];
  
    if (array.length <= 1) {
      return array;
    }
  
    insertionSort(array, animations);
    return animations;
  
}

function insertionSort(items, animations) {

    let size = items.length;

    for (let i = 1; i < size; i++) {
        
        let key = items[i];
        
        let j = i - 1; 
        while ( (j >= 0) && (key < items[j]) ) {
            animations.push([1, i, j]); // comparing.
            animations.push([2, i, j]); // uncoloring
            items[j+1] = items[j];
            animations.push([4, j+1, items[j]]); //replacing
            j--;
        }

        items[j+1] = key;
        animations.push([4, j+1, key]); //replacing
    }

}