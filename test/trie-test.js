import { assert } from 'chai';
import Node from "../lib/node.js";
import Trie from "../lib/trie.js";
import fs from 'fs';

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should be an object', () => {
    assert.isObject(trie);
  });

  it('should have a way of tracking of how many words are in it', () => {
    assert.equal(trie.wordCount, 0);
    assert.equal(trie.count(), 0);
  });

  it('should increment count when new words are added', () => {
    assert.equal(trie.wordCount, 0);
    
    trie.insert('hello');
    
    assert.equal(trie.wordCount, 1);
    
    trie.insert('world');
    
    assert.equal(trie.wordCount, 2);
    
    trie.insert('hello');
    trie.insert('world');
    
    assert.equal(trie.wordCount, 2);
  });

  it('should be able to suggest words based on partial strings', () => {
    trie.insert('hello');
    trie.insert('world');

    assert.equal(trie.suggest('he'), ['hello']);

    trie.insert('hellen');

    assert.equal(trie.suggest('he'), ['hello', 'hellen']);
    assert.equal(trie.suggest('w'), ['world']);
  });

  it('should be able to take in an array of words and insert them', () => {
    const text = "/usr/share/dict/words";
    const dictionary = fs.readFileSync(text).toString().trim().split('\n');

    assert.equal(trie.wordCount, 0);

    trie.populate(dictionary);

    assert.equal(trie.wordCount, 234371);
  });

  it('should be able to remove words the user no longer wants', () => {
    const text = "/usr/share/dict/words";
    const dictionary = fs.readFileSync(text).toString().trim().split('\n');

    assert.equal(trie.wordCount, 0);

    trie.populate(dictionary);

    assert.equal(trie.wordCount, 234371);

    trie.delete('hello');
    trie.delete('world');

    assert.equal(trie.wordCount, 234369);
  });
});