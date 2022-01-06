export function getSelectionSortAnimations(array) {

    const animations = [];
  
    if (array.length <= 1) {
      return array;
    }
  
    selectionSort(array, animations);
    return animations;
  
}

function selectionSort(items, animations) { 

    let size = items.length;
        
    for (let i = 0; i < size; i++) {

        let min = i;

        for (let j = i + 1; j < size; j++) {
            animations.push([1, i, j]); // comparing.
            animations.push([2, i, j]); // uncoloring
            if ( items[j] < items[min] ) {
                min = j; 
            }
         }

         if (min != i) { 
             let temp = items[i]; 
             items[i] = items[min];
             items[min] = temp;      
             animations.push([3, i, min]); // swapping.
        }

    }
    
}