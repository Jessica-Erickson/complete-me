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
    let lowerString = string.toLowerCase();
    if (lowerString.length === 1 && this.currentNode.children[lowerString.charAt(0)] === undefined) {
      this.currentNode.children[lowerString.charAt(0)] = new Node(lowerString.charAt(0), true);
      this.wordCount++;
      this.currentNode = this;
    } else if (lowerString.length > 1 && this.currentNode.children[lowerString.charAt(0)] === undefined) {
      this.currentNode.children[lowerString.charAt(0)] = new Node(lowerString.charAt(0), false);
      this.currentNode = this.currentNode.children[lowerString.charAt(0)];
      this.insert(lowerString.slice(1));
    } else {
      this.currentNode = this.currentNode.children[lowerString.charAt(0)];
      this.insert(lowerString.slice(1));
    }
  }
}

module.exports = Trie;