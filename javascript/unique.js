let arr = [1, 2, 2, 3, 3, 4, 5, 56, 6, 1, 2, 3, 4, 5];

function unique1(arr) {
  return [...new Set(arr)];
}

function unique2( arr ) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1);
        j--;
        length--;
      }
    }
  }
  return arr;
}

function unique3( arr ){
  let arr1 = [];
  for( let i = 0; i < arr.length; i++ ){
    if( arr1.indexOf(arr[i]) == -1 ){
      arr1.push( arr[i] );
    }
  }
  return arr1;
}

function unique4( arr ){
  let arr1 = [];
  for( let i = 0; i < arr.length; i++ ){
    if( arr1.includes( arr[i] ) ){
      arr1.push( arr[i] );
    }
  }
  return arr1;
}

function unique5( arr ){
  arr.fliter( function ( item, index ){
    return arr.indexOf( item, 0 ) === index;
  })
}