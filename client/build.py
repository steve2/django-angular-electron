import os

cwd = os.path.dirname(os.path.realpath(__file__))

os.system('lessc %s/static/styles/site.less %s/static/styles/site.css' % (cwd, cwd))