import Node from "../lib/node.js";

class Trie {
  constructor () {
    this.wordCount = 0;
    this.children = {};
    this.currentNode = this;
    this.suggestNode = this;
    this.suggestWords = [];
  }

  count () {
    return this.wordCount;
  }

  insert (string) {
    let firstLetter = string.charAt(0).toLowerCase();
    if (string.length === 1 && this.currentNode.children[firstLetter] === undefined) {
      this.currentNode.children[firstLetter] = new Node(true);
      this.wordCount++;
      this.currentNode = this;
    } else if (string.length > 1 && this.currentNode.children[firstLetter] === undefined) {
      this.currentNode.children[firstLetter] = new Node(false);
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

  suggest (string) {

  }

  delete (string) {
    for (let i = 0; i < string.length; i++) {
      this.currentNode = this.currentNode.children[string.charAt(i).toLowerCase()]
    }

    if (this.currentNode.endsWord === true) {
      this.currentNode.endsWord = false;
      this.wordCount--;
    }

    this.currentNode = this;
  }
}

module.exports = Trie;