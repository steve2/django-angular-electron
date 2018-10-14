"""Builds the client project. This currently involves:
    - Render `index.html` and `index.electron.html` from `index.html.in` Jinja template.
    - Compiles an `imports.less` file that imports project styles.
    - Compiles `site.less` (includes `imports.less`) into a single `site.css` file.
"""
from jinja2 import Template
import os




# The root directory of the client (directory of this file).
CLIENT_DIR = os.path.dirname(os.path.realpath(__file__))

# Directory with important LESS files.
LESS_DIR = os.path.join(CLIENT_DIR, 'static', 'styles')

# Directories to search for LESS imports.
LESS_IMPORT_DIRS = [
    os.path.join(CLIENT_DIR, 'static', 'states')
]


def _run_command(command):
    """Run a system command and print the output.
    """
    out = os.system(command)
    print('%s [%d]' % (command, out))
    if out is not 0: # Raise an exception if the command fails.
        raise Exception('Command failed: %s' % command)


def compile_less_imports():
    """Search and compile LESS dependencies.
    """
    imports = []
    for importdir in LESS_IMPORT_DIRS:
        for (dir, subdirs, files) in os.walk(importdir):
            for file in files:
                name, ext = os.path.splitext(file)
                if ext == '.less':
                    imports.append(os.path.join(dir, file))
    return imports


def write_imports(imports):
    """Creates `imports.less` and defines LESS imports
    retrieved by the `compile_less_imports()` function.
    """
    path = os.path.join(LESS_DIR, 'imports.less')
    if os.path.exists(path):
        os.remove(path)

    with open(path, 'w+') as imports_file:
        for less in imports:
            less_path = less.replace(
                os.path.join(CLIENT_DIR, 'static'), '..')
            less_path = less_path.replace("\\", "/")
            imports_file.write("@import \"%s\";\n" % less_path)


def render_html_index():
    """Renders `index.html.in` with Jinja2. Generates two files,
    `index.html` and` index.electron.html`.
    """
    template_path = os.path.join(CLIENT_DIR, 'index.html.in')
    index_path = os.path.join(CLIENT_DIR, 'index.html')
    index_elec_path = os.path.join(CLIENT_DIR, 'index.electron.html')

    if os.path.exists(index_path):
        os.remove(index_path)
    if os.path.exists(index_elec_path):
        os.remove(index_elec_path)

    with open(template_path) as template_file:
        contents = template_file.read()
        rendered = Template(contents).render(static='/static', base='/')
        with open(index_path, 'w+') as index_file:
            index_file.write(rendered)
        rendered = Template(contents).render(static='static', base=os.path.join(CLIENT_DIR, ''))
        with open(index_elec_path, 'w+') as index_elec_file:
            index_elec_file.write(rendered)


def compile_less():
    """Compile LESS styles into single CSS file.
    """
    less_path = os.path.join(LESS_DIR, 'site.less')
    css_path = os.path.join(LESS_DIR, 'site.css')
    _run_command('lessc %s %s' % (less_path, css_path))


if __name__ == '__main__':
    render_html_index()
    write_imports(compile_less_imports())
    compile_less()
