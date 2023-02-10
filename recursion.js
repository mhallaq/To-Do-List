// Hey Mohammed. Sorry, but I needed to go in the end so won't be around after your call.
// I've written up three different ways of solving the problem (all copied below in the code box)
//which represent:
// What you had starting doing (looping through the array backwards) taken to it's logical conclusion
// Using built-in JS array methods (the most succinct - could do this as a single line -
// but not necessarily the quickest to understand)
// Doing a recursive solution (this is what I would have done as a solution, but having submitted
// it in CodeWars, all of the top solutions are basically number 2). Recursion, whilst fun,
// is not often the most sensible algorithm, especially in terms of space (memory) complexity,
//  but in this context I think it makes reasonable sense in terms of being fairly easy-to-read code
// If any of these don't make sense how they work, just ask me and we'll have a chat

function parseOne(string) {
  if (string === "null") return null;

  const stringSplit = string.split(" -> ");

  let lastNode;

  for (let i = stringSplit.length - 2; i >= 0; i--) {
    const currentData = Number(stringSplit[i]);
    if (stringSplit[i + 1] === "null") {
      lastNode = new Node(currentData);
    } else {
      lastNode = new Node(currentData, lastNode);
    }
  }

  return lastNode;
}

function parseTwo(string) {
  return (
    string
      .split(" -> ")
      // get rid of null string at the end
      .slice(0, -1)
      // initial value set as null (replacing what was "null" string in the first loop) - same as reduce() but in reverse
      .reduceRight(
        (accumulator, currentValue) =>
          new Node(Number(currentValue), accumulator),
        null
      )
  );
}

function parseThree(string) {
  if (string === "null") return null;
  return addNode(string.split(" -> "));
}

function addNode(array) {
  // base case of the recursion is when the next element is "null", meaning this is the last Node we need to create
  if (array[1] === "null") return new Node(Number(array[0]));

  const current = array.shift();

  // in all other cases, we will call this same function recursively
  return new Node(Number(current), addNode(array));
}
