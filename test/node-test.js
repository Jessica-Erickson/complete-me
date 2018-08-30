import { assert } from 'chai';
import Node from "../lib/node.js";

describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node(false);
  });

  it('should be an object', () => {
    assert.isObject(node);
  });

  it('should be able to have children', () => {
    assert.isObject(node.children);
  });

  it('should start with no children', () => {
    assert.equal(Object.keys(node.children).length, 0);
  });

  it('should know if it is the end of a word', () => {
    assert.equal(node.endsWord, false);
  });
});