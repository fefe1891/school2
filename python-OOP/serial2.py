class SerialGenerator:
      """Machine to create unique incrementing serial numbers."""
      def __init__(self, start=0):
            """Create a new serial generator, starting from start.""" 
            self.start = self.next = start

      def generate(self):
          """Return the next serial."""
          self.next += 1
          return self.next - 1
      
      def reset(self):
            """Reset generator to its original start."""
            self.next = self.start

      def __repr__(self):
            """Show representation."""
            return f"<SerialGenerator start={self.start} next={self.next}>"