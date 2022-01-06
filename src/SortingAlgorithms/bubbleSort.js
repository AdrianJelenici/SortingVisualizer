export function getBubbleSortAnimations(array) {

    const animations = [];
  
    if (array.length <= 1) {
      return array;
    }
  
    bubbleSort(array, animations);
    return animations;
  
}

function bubbleSort (items, animations) {

    let len = items.length;

    for (let step = 0; step < len-1; step++) {

        let checked = false;

        for (let i = 0; i < len - step-1; i ++) {

            animations.push([1, i, i+1]); // comparing.
            animations.push([2, i, i+1]); // uncoloring
            if (items[i] > items[i+1]) {
                let temp = items[i];
                items[i] = items[i+1];
                items[i+1] = temp;
                checked = true;
                animations.push([3, i, i+1 ]); // swapping
            }

        }

        if (checked = false) {
            break;
        }

    }

}