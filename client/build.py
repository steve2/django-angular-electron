import os

cwd = os.path.dirname(os.path.realpath(__file__))


def build_bower():  # Build bower dependencies from bower.json.
    path = '%s\\static'
    os.chdir(path % cwd)
    path = 'bower install'
    out = os.system(path)
    print(path + ' [' + out + ']')


def build_less():
    path = 'lessc %s/static/styles/site.less %s/static/styles/site.css'
    out = os.system(path % (cwd, cwd))
    print((path % (cwd, cwd)) + ' [' + str(out) + ']')


if __name__ == '__main__':
    build_bower()
    build_less()
