export const splitEvenly = (total: number, numOfPart: number) => {
    const eachPart = Math.floor(total / numOfPart);
    let remmainder = Math.floor(total % numOfPart);

    const result = [];
    for(let i = 0;i<numOfPart;i++) {
      let numOfItem = eachPart;
      if(remmainder > 0) {
        numOfItem++;
        remmainder--;
      }
      result.push(numOfItem);
    }

    return result;
  }