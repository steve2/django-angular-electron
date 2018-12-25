import os


# The root directory of the project (the directory containing this file).
ROOT_DIR = os.path.dirname(os.path.realpath(__file__))


__all__ = ['ROOT_DIR', 'run_command']


def run_command(command):
    """
    Run the specified command.
    Args:
        command (str) - Command to execute.
    Raises:
         RuntimeError - Command has non-zero exit code.
    """
    print('Running "%s"... ' % command, end='')
    out = os.system(command)
    if out is 0:
        print('Done.')
    else:
        print('Failed.')
        raise RuntimeError('Command "%s" failed.' % command)
