"""Madlibs Stories."""


class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text
    of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, words, text):
        """Create story with words and template text."""

        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text



stories = {
    "story1": Story(
        ["place", "noun", "verb", "adjective", "plural_noun"],
        """Once upon a time in a long-ago {place}, there lived a
        large {adjective} {noun}. It loved to {verb} {plural_noun}."""
    ),
    "story2": Story(
        ["actor", "vehicle", "location", "celebrity", "verb", "beverage", "song"],
        """{actor} jumped into their {vehicle} and headed towards {location}. On the way, they saw {celebrity} 
        who was also on their way to {location}. They both decided to {verb} while drinking {beverage} and 
        listening to the song '{song}'. It was a day to remember!"""
    ),
    "story3": Story(
        ["animal", "adverb", "color", "food"],
        "The {adverb} {animal} loves the {color} {food}"
    )
}
