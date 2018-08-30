import Node from "../lib/node.js";

class Trie {
  constructor () {
    this.wordCount = 0;
    this.children = {};
    this.currentNode = this;
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
    this.suggestWords = [];

    for (let i = 0; i < string.length; i++) {
      if (this.currentNode.children[string.charAt(i).toLowerCase()]) {
        this.currentNode = this.currentNode.children[string.charAt(i).toLowerCase()]
      } else {
        return this.suggestWords;
      }
    }

    function recursiveThingy (bufferString, node, suggestionArray) {
      if (node.endsWord) {
        suggestionArray.push(bufferString);
      }

      Object.keys(node.children).forEach(child => {
        recursiveThingy(bufferString + child, node.children[child], suggestionArray);
      });
    }
    
    recursiveThingy(string, this.currentNode, this.suggestWords);

    this.currentNode = this;

    return this.suggestWords;
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