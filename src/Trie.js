class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let node = this.root;
      for (let char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
    }
  
    search(word) {
      let node = this.root;
      for (let char of word) {
        if (!node.children[char]) {
          return false;
        }
        node = node.children[char];
      }
      return node.isEndOfWord;
    }
  
    startsWith(prefix) {
      let node = this.root;
      for (let char of prefix) {
        if (!node.children[char]) {
          return false;
        }
        node = node.children[char];
      }
      return true;
    }
  
    autoComplete(prefix) {
      let node = this.root;
      let suggestions = [];
      for (let char of prefix) {
        if (!node.children[char]) {
          return [];
        }
        node = node.children[char];
      }
      this._collect(node, prefix, suggestions);
      return suggestions;
    }
  
    _collect(node, prefix, suggestions) {
      if (node.isEndOfWord) {
        suggestions.push(prefix);
      }
      for (let char in node.children) {
        this._collect(node.children[char], prefix + char, suggestions);
      }
    }
  }
  
  export default Trie;
  