import os
import logging


# The root directory of the project (the directory containing this file).
ROOT_DIR = os.path.dirname(os.path.realpath(__file__))


__all__ = ['ROOT_DIR', 'run_command', 'set_directory']


def set_directory(subdir):
    """
    Sets the working directory to {subdir}.
    Raises:
        OSError - Command to change directories is not available.
    """
    working_dir = os.path.join(ROOT_DIR, subdir)
    os.chdir(working_dir)
    print('Current directory: %s' % working_dir)


def run_command(command):
    """
    Run the specified command.
    Args:
        command (str) - Command to execute.
    Raises:
         RuntimeError - Command has non-zero exit code.
    """
    out = os.system(command)
    logging.info('%s [%d]' % (command, out))
    if out is not 0:
        raise RuntimeError('Command "%s" failed.' % command)
