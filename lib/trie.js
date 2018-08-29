import Node from "../lib/node.js";

class Trie {
  constructor () {
    this.wordCount = 0;
    this.children = {};
    this.currentNode = this;
  }

  count () {
    return this.wordCount;
  }

  insert (string) {
    let firstLetter = string.charAt(0).toLowerCase();
    if (string.length === 1 && this.currentNode.children[firstLetter] === undefined) {
      this.currentNode.children[firstLetter] = new Node(firstLetter, true);
      this.wordCount++;
      this.currentNode = this;
    } else if (string.length > 1 && this.currentNode.children[firstLetter] === undefined) {
      this.currentNode.children[firstLetter] = new Node(firstLetter, false);
      this.currentNode = this.currentNode.children[firstLetter];
      this.insert(string.slice(1));
    } else if (string.length === 1 && this.currentNode.children[firstLetter].endsWord === false) {
      this.currentNode.children[firstLetter].endsWord = true;
      this.wordCount++;
      this.currentNode = this;
    } else if (string.length === 1) {
      this.currentNode = this;
    } else {
      this.currentNode = this.currentNode.children[firstLetter];
      this.insert(string.slice(1));
    }
  }

  populate (array) {
    array.forEach(word => {
      this.insert(word);
    });
  }
}

module.exports = Trie;