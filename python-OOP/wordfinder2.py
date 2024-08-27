"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
      def __init__(self, path):
            """Read dictionary file and print number of words read."""
            with open(path) as dict_file:
                  self.words = self.parse(dict_file)
            #print(f"{len(self.words)} words read")

      def parse(self, dict_file):
            """Parse dict_file -> list of words.
            """
            """Returning a random word from the list of words."""
            return [w.strip() for w in dict_file]

      def random(self):
            """Return random word.

            >>> wf = WordFinder("simple.txt")
            >>> wf.random() in wf.words
            True
            """ 
            return random.choice(self.words)
      
class SpecialWordFinder(WordFinder):
      def parse(self, dict_file):
            """Parse dict_file -> list of words, skipping 
            blanks/comments.
            #Assuming 'somple.txt' contains the word 'dictionary' and not starting with a #
            >>> swf = SpecialWordFinder("simple.txt")
            >>> 'dictionary' in swf.words
            True""" 
            return [w.strip() for w in dict_file if w.strip()
                    and not w.startswith("#")]
      
wf = WordFinder("simple.txt")

            
      