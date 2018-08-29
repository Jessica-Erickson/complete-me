class Node {
  constructor (letter, endsWord) {
    this.letter = letter;
    this.children = {};
    this.endsWord = endsWord;
  }
}

module.exports = Node;