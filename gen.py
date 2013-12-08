import sys
import yaml
import datetime
from jinja2 import Template, Environment

ENV = 'production'
if len(sys.argv) > 1:
    ENV = str(sys.argv[1])

def get_file_content(file_path):
    file = open(file_path, 'r')
    content = file.read()
    file.close()
    return content

def get_json_data(file_path):
    raw_json = get_file_content(file_path)
    return json.loads(raw_json)

def get_yaml_data(file_path):
    raw_yaml = get_file_content(file_path)
    return yaml.load(raw_yaml)

def render_template(file_path, **kwargs):
    env = Environment(trim_blocks=True,  lstrip_blocks=True)
    template = env.from_string(get_file_content(file_path))
    return template.render(**kwargs)

def generate():
    for lang in ['fr']:
        interpolation = {'lang': lang}
        template_data = {
            'technologies': get_yaml_data('data/technologies.yml'),
            'tools': get_yaml_data('data/tools.yml'),
            'works': get_yaml_data('data/%(lang)s/works.yml' % interpolation),
            'experiences': get_yaml_data('data/%(lang)s/experiences.yml' % interpolation),
            'generation_date': datetime.datetime.now(),
            'env': ENV,
        }
        result = render_template('template.jinja', **template_data)
        output = open('index.%(lang)s.html' % interpolation, 'w')
        output.write(result)
        output.close()

if __name__ == '__main__':
    generate()