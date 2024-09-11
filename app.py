from flask import Flask, render_template, request, redirect, url_for
from stories import Story, stories

app = Flask(__name__)

prompts = ["place", "noun", "verb", "adjective", "plural_noun"]
story_template = "In a distant far away {place}, there lived a {adjective} {noun}, who loved to {verb} {plural_noun}."
story = Story(prompts, story_template)


@app.route('/')
def story_selection():
    return render_template("story_selection.html", stories=stories.keys())


@app.route('/form')
def show_form():
    story_id = request.args.get("story")
    if story_id is None or story_id not in stories:
        return redirect(url_for('story_selection'))
    story_instance = stories[story_id]
    prompts = story_instance.prompts
    return render_template("form.html", prompts=prompts, story_id=story_id)

@app.route('/story', methods=['POST'])
def generate_story():
    data = request.form
    story_id = request.form.get("story_id")
    story_instance = stories[story_id]
    print(data)
    story_text = story_instance.generate(data)
    return render_template("story.html", story_text=story_text)


@app.route('/create', methods=['GET', 'POST'])
def create_story():
    if request.method == 'POST':
        title = request.form.get('title')
        prompts_from_form = request.form.get('prompts')
        prompts_list = [x.strip() for x in prompts_from_form.split(',')]
        print(prompts_list)
        template = request.form.get('template')
        stories[title] = Story(prompts_list, template)
        return redirect(url_for('select_story'))
    else:
        # Render story creation form
        return render_template('create.html')
    
    
@app.route('/select')
def select_story():
    return render_template("story_selection.html", stories=stories.keys())


if __name__ == "__main__":
    app.run(debug=True) 