from jinja2 import Template
import os
import logging
import argparse
import json

from shared import *


# The root directory of the client (directory of this file).
CLIENT_DIR = os.path.join(ROOT_DIR, 'client')

# Directory with important LESS files.
LESS_DIR = os.path.join(CLIENT_DIR, 'static', 'styles')
LESS_IMPORTS_PATH = os.path.join(LESS_DIR, 'imports.less')

# Directories to search for LESS imports.
LESS_IMPORT_DIRS = [
    os.path.join(CLIENT_DIR, 'static', 'states'),
    os.path.join(CLIENT_DIR, 'static', 'widgets')
]

# HTML index files are generated from a Jinja2 template.
TEMPLATE_INDEX_PATH = os.path.join(CLIENT_DIR, 'index.html.in')
WEB_INDEX_PATH = os.path.join(CLIENT_DIR, 'index.html')
ELECTRON_INDEX_PATH = os.path.join(CLIENT_DIR, 'index.electron.html')


"""
This script should build the entire project.

Client application build steps:
    1. Render index templates with Jinja2 (for web and Electron).
    2. Create {imports.less} file with client LESS imports.
    3. Compiles {site.less} into final {site.css} file.

Server application build steps:
    None (yet).
"""


def build_electron_app(application_name):
    """Builds the Electron client application.
    Raises:
        RuntimeError: The `electron-packager` command failed.
    """
    set_directory('')  # Go to the root directory.
    run_command('electron-packager .\client "%s"' % application_name)


def render_html_templates():
    """
    Renders HTML index template with Jinja2.
    The {index.html.in} file is rendered, generating two files:
        * {index.html}
        * {index.electron.html}
    """
    # Delete previous output files if they exist.
    if os.path.exists(WEB_INDEX_PATH):
        os.remove(WEB_INDEX_PATH)
    if os.path.exists(ELECTRON_INDEX_PATH):
        os.remove(ELECTRON_INDEX_PATH)

    with open(TEMPLATE_INDEX_PATH) as template_file:
        contents = template_file.read()

        # Render web based HTML index.
        rendered = Template(contents).render(static='/static', base='/')
        with open(WEB_INDEX_PATH, 'w+') as index_file:
            index_file.write(rendered)
        logging.info('Created %s.' % WEB_INDEX_PATH)

        # Render Electron based HTML index.
        rendered = Template(contents).render(
            static='static', base=os.path.join(CLIENT_DIR, ''))
        with open(ELECTRON_INDEX_PATH, 'w+') as index_elec_file:
            index_elec_file.write(rendered)
        logging.info('Created %s.' % ELECTRON_INDEX_PATH)


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
    if os.path.exists(LESS_IMPORTS_PATH):
        os.remove(LESS_IMPORTS_PATH)
    with open(LESS_IMPORTS_PATH, 'w+') as imports_file:
        for less in imports:
            less_path = less.replace(
                os.path.join(CLIENT_DIR, 'static'), '..')
            less_path = less_path.replace("\\", "/")
            imports_file.write("@import \"%s\";\n" % less_path)
    logging.info('Created %s.' % LESS_IMPORTS_PATH)


def compile_less_styles():
    """
    Compile LESS styles into single CSS file.
    Raises:
        RuntimeError - The {lessc} command failed.
    """
    less_path = os.path.join(LESS_DIR, 'site.less')
    css_path = os.path.join(LESS_DIR, 'site.css')
    run_command('lessc %s %s' % (less_path, css_path))


def build(electron_app=False):
    """
    Build the project.
    """
    if electron_app:
        # This takes some time, be careful how often we build.
        package_json_path = os.path.join(ROOT_DIR, 'client', 'package.json')
        with open(package_json_path) as package_json:
            metadata = json.load(package_json)
        build_electron_app(metadata['name'])
    else:
        render_html_templates()
        create_imports_less()
        compile_less_styles()


def clean():
    """
    Cleans build files from the project.
    """
    # These are created by `render_html_templates`.
    if os.path.isfile(ELECTRON_INDEX_PATH):
        os.remove(ELECTRON_INDEX_PATH)
        logging.info('Deleted %s.' % ELECTRON_INDEX_PATH)
    if os.path.isfile(WEB_INDEX_PATH):
        os.remove(WEB_INDEX_PATH)
        logging.info('Deleted %s.' % WEB_INDEX_PATH)
    # This is created by `create_imports_less`.
    if os.path.isfile(LESS_IMPORTS_PATH):
        os.remove(LESS_IMPORTS_PATH)
        logging.info('Deleted %s.' % LESS_IMPORTS_PATH)


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.INFO,
        format='%(levelname)s:%(message)s'
    )
    parser = argparse.ArgumentParser(description='Builds the project.')
    parser.add_argument('--clean', action='store_true')
    parser.add_argument('--electron', action='store_true')
    args = parser.parse_args()
    if args.clean:
        clean()
    else:
        build(electron_app=args.electron)
