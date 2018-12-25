from jinja2 import Template
import os
import logging

from shared import *


"""
This script should build the entire project.

Client application build steps:
    1. Render index templates with Jinja2 (for web and Electron).
    2. Create {imports.less} file with client LESS imports.
    3. Compiles {site.less} into final {site.css} file.

Server application build steps:
    None (yet).
"""


# The root directory of the client (directory of this file).
CLIENT_DIR = os.path.join(ROOT_DIR, 'client')

# Directory with important LESS files.
LESS_DIR = os.path.join(CLIENT_DIR, 'static', 'styles')

# Directories to search for LESS imports.
LESS_IMPORT_DIRS = [
    os.path.join(CLIENT_DIR, 'static', 'states'),
    os.path.join(CLIENT_DIR, 'static', 'widgets')
]


def render_html_templates():
    """
    Renders HTML index template with Jinja2.
    The {index.html.in} file is rendered, generating two files:
        * {index.html}
        * {index.electron.html}
    """
    template_path = os.path.join(CLIENT_DIR, 'index.html.in')
    index_path = os.path.join(CLIENT_DIR, 'index.html')
    index_elec_path = os.path.join(CLIENT_DIR, 'index.electron.html')

    # Delete previous output files if they exist.
    if os.path.exists(index_path):
        os.remove(index_path)
    if os.path.exists(index_elec_path):
        os.remove(index_elec_path)

    with open(template_path) as template_file:
        contents = template_file.read()

        # Render web based HTML index.
        rendered = Template(contents).render(static='/static', base='/')
        with open(index_path, 'w+') as index_file:
            index_file.write(rendered)
        logging.info('Created %s.' % index_path)

        # Render Electron based HTML index.
        rendered = Template(contents).render(
            static='static', base=os.path.join(CLIENT_DIR, ''))
        with open(index_elec_path, 'w+') as index_elec_file:
            index_elec_file.write(rendered)
        logging.info('Created %s.' % index_elec_path)


def find_less_imports():
    """
    Search {LESS_IMPORT_DIRS} for LESS dependencies.
    Returns:
        List of LESS file paths that were found.
    """
    imports = []
    for importdir in LESS_IMPORT_DIRS:
        for (folder, subfolders, files) in os.walk(importdir):
            for file in files:
                name, ext = os.path.splitext(file)
                if ext == '.less':
                    imports.append(os.path.join(folder, file))
    return imports


def create_imports_less():
    """
    Creates final {imports.less} file.
    """
    imports = find_less_imports()
    path = os.path.join(LESS_DIR, 'imports.less')
    if os.path.exists(path):
        os.remove(path)
    with open(path, 'w+') as imports_file:
        for less in imports:
            less_path = less.replace(
                os.path.join(CLIENT_DIR, 'static'), '..')
            less_path = less_path.replace("\\", "/")
            imports_file.write("@import \"%s\";\n" % less_path)
    logging.info('Created %s.' % path)


def compile_less_styles():
    """
    Compile LESS styles into single CSS file.
    Raises:
        RuntimeError - The {lessc} command failed.
    """
    less_path = os.path.join(LESS_DIR, 'site.less')
    css_path = os.path.join(LESS_DIR, 'site.css')
    run_command('lessc %s %s' % (less_path, css_path))


def build():
    """
    Build the project.
    """
    render_html_templates()
    create_imports_less()
    compile_less_styles()


if __name__ == '__main__':
    build()
