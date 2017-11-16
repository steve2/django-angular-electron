import os

clientDirectory = os.path.dirname(os.path.realpath(__file__))


def _set_directory(subdir):
    workingDirectory = os.path.join(clientDirectory, subdir)
    os.chdir(workingDirectory)
    print('Current directory: %s' % workingDirectory)


def _run_command(command):
    out = os.system(command)
    print('%s [%d]' % (command, out))
    if out is not 0: # Raise an exception if the command fails.
        raise Exception('Command failed: %s' % command)


def compile_less():
    _set_directory(os.path.join(clientDirectory, 'static', 'styles'))
    _run_command('lessc site.less site.css')


if __name__ == '__main__':
    compile_less()
