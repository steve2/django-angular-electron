import os

cwd = os.path.dirname(os.path.realpath(__file__))


def build_client(): # Build client assets.
  path = 'lessc %s/static/styles/site.less %s/static/styles/site.css'
  out = os.system(path % (cwd, cwd))  
  print((path % (cwd, cwd)) + ' [' + str(out) + ']')


if __name__ == '__main__':
  build_client()
